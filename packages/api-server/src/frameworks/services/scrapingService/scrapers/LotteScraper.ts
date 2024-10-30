import * as cheerio from "cheerio"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import LayerDTO from "@domains/dtos/LayerDTO"
import DeliveryDTO from "@domains/dtos/DeliveryDTO"
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP"
import DeliveryStateGenerator from "../helpers/DeliveryStateGenerator"
import StringHelper from "../helpers/StringHelper"
import IScraper from "./interfaces/IScraper"

export default class LotteScraper implements IScraper {
  constructor(private readonly serverHTTP: IServerHTTP) {}

  async getTrack(trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>> {
    try {
      const trackingRes = await this.serverHTTP.get(
        `https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=${trackingNumber}`
      )

      if (trackingRes.status !== 200) {
        return new LayerDTO({
          isError: true,
          message: "운송장 조회에 실패하였습니다."
        })
      }

      const resData = await trackingRes.text()
      const $ = cheerio.load(resData)
      const $wrap = $(".contArea")

      const $informationTable = $wrap.find("table").eq(0)
      const $progressTable = $wrap.find("table").eq(1)
      const $informations = $informationTable.find("tbody").find("td")

      if ($informations.length === 1) {
        return new LayerDTO({
          isError: true,
          message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
        })
      }

      const progressVOs = []
      $progressTable
        .find("tbody")
        .find("tr")
        .each((_, element) => {
          const td = $(element).find("td")
          const description = StringHelper.trim(td.eq(3).text())
          const location = StringHelper.trim(td.eq(2).text())
          const time = this.parseDateTime(StringHelper.trim(td.eq(1).html()))
          const state = this.parseStatus(td.eq(0).text())
          progressVOs.push(
            new DeliveryProgressVO({
              description,
              location,
              time,
              state
            })
          )
        })

      const stateVO =
        progressVOs.length > 0
          ? progressVOs[0].state
          : this.parseStatus("상품준비중")

      const fromVO = new DeliveryLocationVO({
        name: this.parseLocationName($informations.eq(1).text()),
        time:
          progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
      })

      const toVO = new DeliveryLocationVO({
        name: this.parseLocationName($informations.eq(2).text()),
        time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
      })

      const deliveryDTO = new DeliveryDTO({
        from: fromVO,
        to: toVO,
        progresses: progressVOs,
        state: stateVO
      })

      return new LayerDTO({
        data: deliveryDTO
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  private parseLocationName(value: string) {
    return value
  }

  private parseDateTime(value: string) {
    const dateTime = value.split("&nbsp;")
    const date = dateTime[0]
    const time =
      dateTime[1] === "--:--" ? dateTime[1] + ":--" : dateTime[1] + ":00"
    return date + " " + time
  }

  private parseStatus(value?: string) {
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
}
