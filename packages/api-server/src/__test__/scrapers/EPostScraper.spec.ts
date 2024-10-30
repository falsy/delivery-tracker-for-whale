import * as cheerio from "cheerio"
import { decode } from "html-entities"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import StringHelper from "@frameworks/services/scrapingService/helpers/StringHelper"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import EPostMockHTML from "./EPostMockHTML"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value.includes("접수")) {
    return DeliveryStateGenerator.getState("상품인수")
  }
  if (value.includes("배달준비")) {
    return DeliveryStateGenerator.getState("배달출발")
  }
  if (value.includes("배달완료")) {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품이동중")
}

const parseDateTime = (value: string) => {
  const dateTime = value.split(" ")
  const time = dateTime.length > 1 ? " " + dateTime[1] + ":00" : ""
  return dateTime[0].replace(/\./g, "-") + time
}

const parseLocationName = (value: string) => {
  const short = value.substring(0, 4)
  return short + (short.includes("*") ? "" : "*")
}

describe("EPostCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const $ = cheerio.load(EPostMockHTML)
    const $informationTable = $("#print").find("table")
    const $progressTable = $("#processTable")
    const $informations = $informationTable.find("td")

    const progressVOs = []
    $progressTable
      .find("tbody")
      .find("tr")
      .each((_, element) => {
        const td = $(element).find("td")
        const descriptionText = StringHelper.trim(td.eq(3).text())
        const description = descriptionText.includes("소포 물품 사진")
          ? "접수"
          : descriptionText
        const location = td.eq(2).find("a").eq(0).text()
        const time = parseDateTime(td.eq(0).html() + " " + td.eq(1).html())
        const state = parseStatus(td.eq(3).text())
        progressVOs.push(
          new DeliveryProgressVO({
            description,
            location,
            time,
            state
          })
        )
      })
    progressVOs.reverse()
    expect(progressVOs.length).toBe(6)

    const stateVO =
      progressVOs.length > 0 ? progressVOs[0].state : parseStatus("상품준비중")
    const stateData = parseStatus("배달완료")
    expect(stateVO).toStrictEqual(stateData)

    const to = decode($informations.eq(1).html()).split("<br>")
    const toVO = new DeliveryLocationVO({
      name: parseLocationName(to[0]),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "테*트",
      time: "2024-03-18 12:12:00"
    })
    expect(toVO).toStrictEqual(toData)

    const from = decode($informations.eq(0).html()).split("<br>")
    const fromVO = new DeliveryLocationVO({
      name: parseLocationName(from[0]),
      time: parseDateTime(from[1])
    })
    const fromData = new DeliveryLocationVO({
      name: "테스트익*",
      time: "2024-03-15"
    })
    expect(fromVO).toStrictEqual(fromData)

    // const deliveryDTO = new DeliveryDTO({
    //   from: fromVO,
    //   to: toVO,
    //   progresses: progressVOs,
    //   state: stateVO
    // })

    // console.log(deliveryDTO)
  })
})
