import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import CJLogisticsMock from "./CJLogisticsMock"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품준비중")
  }
  if (["41", "42", "44"].includes(value)) {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value === "11") {
    return DeliveryStateGenerator.getState("상품인수")
  }
  if (value === "82") {
    return DeliveryStateGenerator.getState("배달출발")
  }
  if (value === "91") {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품준비중")
}

const parseLocationName = (value: string) => {
  const short = value.substring(0, 4)
  return short + (short.includes("*") ? "" : "*")
}

describe("CJLogisticsCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const res = {
      data: CJLogisticsMock
    }

    const informationTable = res.data.parcelResultMap.resultList
    const progressTable = res.data.parcelDetailResultMap.resultList

    const progressVOs = progressTable
      .map((row) => {
        return new DeliveryProgressVO({
          description: row.crgNm,
          location: row.regBranNm,
          time: row.dTime,
          state: parseStatus(row.crgSt)
        })
      })
      .reverse()

    const stateVO =
      progressVOs.length > 0 ? progressVOs[0].state : parseStatus()

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName(informationTable[0].sendrNm),
      time: progressTable.length > 0 ? progressTable[0].dTime : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "코**",
      time: "2024-04-08 18:15:11"
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName(informationTable[0].rcvrNm),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "이**",
      time: "2024-04-11 17:17:04"
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
