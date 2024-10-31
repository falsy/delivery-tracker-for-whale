import * as cheerio from "cheerio"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import StringHelper from "@frameworks/services/scrapingService/helpers/StringHelper"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import LotteMockHTML from "./LotteMockHTML"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value.includes("상품접수")) {
    return DeliveryStateGenerator.getState("상품인수")
  }
  if (value.includes("배송 출발")) {
    return DeliveryStateGenerator.getState("배달출발")
  }
  if (value.includes("배달 완료")) {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품이동중")
}

const parseDateTime = (value: string) => {
  const dateTime = value.split("&nbsp;")
  const date = dateTime[0]
  const time =
    dateTime[1] === "--:--" ? dateTime[1] + ":--" : dateTime[1] + ":00"
  return date + " " + time
}

const parseLocationName = (value: string) => {
  return value
}

describe("LotteCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const $ = cheerio.load(LotteMockHTML)
    const $informationTable = $("table").eq(0)
    const $progressTable = $("table").eq(1)
    const $informations = $informationTable.find("tbody").find("td")

    const progressVOs = []
    $progressTable
      .find("tbody")
      .find("tr")
      .each((_, element) => {
        const td = $(element).find("td")
        const description = StringHelper.trim(td.eq(3).text())
        const location = StringHelper.trim(td.eq(2).text())
        const time = parseDateTime(StringHelper.trim(td.eq(1).html()))
        const state = parseStatus(td.eq(0).text())
        progressVOs.push(
          new DeliveryProgressVO({
            description,
            location,
            time,
            state
          })
        )
      })
    expect(progressVOs.length).toBe(7)

    const stateVO =
      progressVOs.length > 0 ? progressVOs[0].state : parseStatus("상품준비중")
    const stateData = parseStatus("배달 완료")
    expect(stateVO).toStrictEqual(stateData)

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName($informations.eq(1).text()),
      time:
        progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "광주지점",
      time: "2024-04-03 --:--:--"
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName($informations.eq(2).text()),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "화성서부(대)",
      time: "2024-04-06 14:44:00"
    })
    expect(toVO).toStrictEqual(toData)

    // const deliveryDTO = new DeliveryDTO({
    //   from: fromVO,
    //   to: toVO,
    //   progresses: progressVOs,
    //   state: stateVO
    // })

    // console.log(deliveryDTO)
  })
})
