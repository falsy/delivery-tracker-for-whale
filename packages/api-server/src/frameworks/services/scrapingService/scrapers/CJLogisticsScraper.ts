import * as cheerio from "cheerio"
import { Cookie } from "tough-cookie"
import DeliveryDTO from "@domains/dtos/DeliveryDTO"
import DeliveryLocationVO from "@domains/vos/DeliveryLocationVO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import DeliveryStateGenerator from "../helpers/DeliveryStateGenerator"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "@domains/dtos/LayerDTO"
import DeliveryProgressVO from "@domains/vos/DeliveryProgressVO"
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP"
import IScraper from "./interfaces/IScraper"

export default class CJLogisticsScraper implements IScraper {
  constructor(private readonly serverHTTP: IServerHTTP) {}

  async getTrack(trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>> {
    try {
      const tracikng = await this.serverHTTP.get(
        "https://www.cjlogistics.com/ko/tool/parcel/tracking"
      )

      if (tracikng.status !== 200) {
        return new LayerDTO({
          isError: true,
          message: "운송장 조회에 실패하였습니다."
        })
      }

      const cookie =
        tracikng.headers
          .get("set-cookie")
          ?.split(",")
          .map((c) => Cookie.parse(c))
          .map((c) => c?.cookieString() ?? null)
          .join("; ") ?? null

      const $ = cheerio.load(await tracikng.text())
      const csrf = $("input[name=_csrf]").val()

      const trackingRes = await this.serverHTTP.post(
        `https://www.cjlogistics.com/ko/tool/parcel/tracking-detail?paramInvcNo=${trackingNumber}&_csrf=${csrf}`,
        {},
        {
          headers: {
            Cookie: cookie
          }
        }
      )

      if (trackingRes.status !== 200) {
        return new LayerDTO({
          isError: true,
          message: "운송장 조회에 실패하였습니다."
        })
      }

      const resData = await trackingRes.json()
      const informationTable = resData.parcelResultMap.resultList
      const progressTable = resData.parcelDetailResultMap.resultList

      if (informationTable.length === 0) {
        return new LayerDTO({
          isError: true,
          message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
        })
      }

      const progressVOs = progressTable
        .map((row) => {
          return new DeliveryProgressVO({
            description: row.crgNm,
            location: row.regBranNm,
            time: row.dTime,
            state: this.parseStatus(row.crgSt)
          })
        })
        .reverse()

      const stateVO =
        progressVOs.length > 0 ? progressVOs[0].state : this.parseStatus()

      const fromVO = new DeliveryLocationVO({
        name: this.parseLocationName(informationTable[0].sendrNm),
        time: progressTable.length > 0 ? progressTable[0].dTime : ""
      })

      const toVO = new DeliveryLocationVO({
        name: this.parseLocationName(informationTable[0].rcvrNm),
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
    const short = value.substring(0, 4)
    return short + (short.includes("*") ? "" : "*")
  }

  private parseStatus(value?: string) {
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
}
