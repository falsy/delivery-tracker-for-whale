import * as cheerio from "cheerio"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import StringHelper from "@frameworks/services/scrapingService/helpers/StringHelper"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import DaesinMockHTML from "./DaesinMockHTML"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
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

describe("DaesinCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const $ = cheerio.load(DaesinMockHTML)
    const $content = $("#content")

    const $informationTable = $content.find("table")
    const $progressTable = $content.find("table").eq(1)
    const $informations = $informationTable.find("tbody")

    const progressVOs = []
    $progressTable
      .find("tbody")
      .find("tr")
      .each((i, element) => {
        if (i === 0) return
        const td = $(element).find("td")
        const description = StringHelper.trim(td.eq(2).text())
        const location = StringHelper.trim(td.eq(1).text())
        const time = parseDateTime(td.eq(3).text())
        const state = parseStatus(td.eq(5).text())
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

    expect(progressVOs.length).toBe(3)

    const stateVO =
      progressVOs.length > 0 && progressVOs[0].state.name === "배달완료"
        ? progressVOs[0].state
        : parseStatus()
    const stateData = parseStatus("배송완료")
    expect(stateVO).toStrictEqual(stateData)

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName(
        $informations.find("tr").eq(0).find("td").eq(0).text()
      ),
      time:
        progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "바***",
      time: "2024-02-27 09:58:00",
      address: ""
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName(
        $informations.find("tr").eq(1).find("td").eq(0).text()
      ),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "한**",
      time: "2024-02-28 03:37:00",
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
