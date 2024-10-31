import * as cheerio from "cheerio"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import StringHelper from "@frameworks/services/scrapingService/helpers/StringHelper"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import HanjinMockHTML from "./HanjinMockHTML"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value.includes("집하")) {
    return DeliveryStateGenerator.getState("상품인수")
  }
  if (value.includes("배송출발")) {
    return DeliveryStateGenerator.getState("배달출발")
  }
  if (value.includes("배송완료")) {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품이동중")
}

const parseDateTime = (date: string, time: string) => {
  return date + " " + time + ":00"
}

const parseLocationName = (value: string) => {
  const short = value.substring(0, 4)
  return short + (short.includes("*") ? "" : "*")
}

describe("HanjinCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const $ = cheerio.load(HanjinMockHTML)
    const $informationTable = $(".delivery-tbl").find("tbody")
    const $progressTable = $(".waybill-tbl").find("table")
    const $informations = $informationTable.find("td")

    const progressVOs = []
    $progressTable
      .find("tbody")
      .find("tr")
      .each((_, element) => {
        const td = $(element).find("td")
        const description = StringHelper.trim(td.eq(3).text())
        const location = StringHelper.trim(td.eq(2).text())
        const time = parseDateTime(td.eq(0).text(), td.eq(1).text())
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
    expect(progressVOs.length).toBe(8)

    const stateVO =
      progressVOs.length > 0 ? progressVOs[0].state : parseStatus("상품준비중")
    const stateData = parseStatus("배송완료")
    expect(stateVO).toStrictEqual(stateData)

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName($informations.eq(1).text()),
      time:
        progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "주식**",
      time: "2024-04-12 17:08:00"
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName($informations.eq(2).text()),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "테*트",
      time: "2024-04-15 14:10:00"
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
