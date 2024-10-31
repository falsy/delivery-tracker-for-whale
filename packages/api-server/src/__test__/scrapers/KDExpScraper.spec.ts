import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import DeliveryStateGenerator from "@frameworks/services/scrapingService/helpers/DeliveryStateGenerator"
// import DeliveryDTO from "@frameworks/dtos/DeliveryDTO"
import KDExpMock from "./KDExpMock"

const parseStatus = (value?: string) => {
  if (typeof value !== "string") {
    return DeliveryStateGenerator.getState("상품이동중")
  }
  if (value.includes("접수완료")) {
    return DeliveryStateGenerator.getState("상품인수")
  }
  if (value.includes("배송완료")) {
    return DeliveryStateGenerator.getState("배달완료")
  }
  return DeliveryStateGenerator.getState("상품이동중")
}

const parseDateTime = (value: string) => {
  return value.split(".")[0]
}

const parseLocationName = (value: string) => {
  const short = value.substring(0, 4)
  return short + (short.includes("*") ? "" : "*")
}

describe("KDExpCrawler", () => {
  it("should fetch and parse tracking information", async () => {
    const res = {
      data: KDExpMock
    }

    const informationTable = res.data.info
    const progressTable = res.data.items

    const progressVOs = progressTable
      .map((row) => {
        return new DeliveryProgressVO({
          description: `연락처: ${row.tel}`,
          location: row.location,
          time: parseDateTime(row.reg_date),
          state: parseStatus(row.stat)
        })
      })
      .reverse()

    const stateVO =
      progressVOs.length > 0 ? progressVOs[0].state : parseStatus()

    const fromVO = new DeliveryLocationVO({
      name: parseLocationName(informationTable.send_name.substring(0, 4)),
      time:
        progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
    })
    const fromData = new DeliveryLocationVO({
      name: "신***",
      time: "2024-02-27 14:07:21"
    })
    expect(fromVO).toStrictEqual(fromData)

    const toVO = new DeliveryLocationVO({
      name: parseLocationName(informationTable.re_name.substring(0, 4)),
      time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
    })
    const toData = new DeliveryLocationVO({
      name: "우***",
      time: "2024-02-29 14:41:00"
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
