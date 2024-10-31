import * as cheerio from "cheerio"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import StringHelper from "@frameworks/services/scrapingService/helpers/StringHelper"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import LogenMockHTML from "./LogenMockHTML"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value.includes("배송출고")) {
    return DeliveryStateGenerator.getState("배달출발")
  }
  if (value.includes("배송완료")) {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품이동중")
}

const parseDateTime = (value: string) => {
  return StringHelper.trim(value + ":00")
}

const parseLocationName = (value: string) => {
  const short = value.substring(0, 4)
  return short + (short.includes("*") ? "" : "*")
}

describe("LogenCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const $ = cheerio.load(LogenMockHTML)
    const $content = $(".tab_contents")

    const $informationTable = $content.find("table")
    const $progressTable = $content.find("table").eq(1)
    const $informations = $informationTable.find("tbody")

    const progressVOs = []
    $progressTable
      .find("tbody")
      .find("tr")
      .each((_, element) => {
        const td = $(element).find("td")
        const description = StringHelper.trim(td.eq(3).text())
        const location = StringHelper.trim(td.eq(1).text())
        const time = parseDateTime(td.eq(0).text())
        const state = parseStatus(td.eq(2).text())
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
      progressVOs.length > 0 && progressVOs[0].state.name === "배달완료"
        ? progressVOs[0].state
        : parseStatus()
    const stateData = parseStatus("배송완료")
    expect(stateVO).toStrictEqual(stateData)

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName(
        $informations.find("tr").eq(3).find("td").eq(1).text()
      ),
      time:
        progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "펠***",
      time: "2024.04.10 01:02:00"
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName(
        $informations.find("tr").eq(3).find("td").eq(3).text()
      ),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "문**",
      time: "2024.04.11 13:27:00",
      address: ""
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
