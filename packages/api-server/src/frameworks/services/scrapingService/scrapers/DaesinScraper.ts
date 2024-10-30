import * as cheerio from "cheerio"
import * as iconv from "iconv-lite"
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

export default class DaesinScraper implements IScraper {
  constructor(private readonly serverHTTP: IServerHTTP) {}

  async getTrack(trackingNumber: string): Promise<ILayerDTO<IDeliveryDTO>> {
    try {
      const trackingRes = await this.serverHTTP.post(
        `https://www.ds3211.co.kr/freight/internalFreightSearch.ht?billno=${trackingNumber}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )

      if (trackingRes.status !== 200) {
        return new LayerDTO({
          isError: true,
          message: "운송장 조회에 실패하였습니다."
        })
      }

      const utf8Data = iconv.decode(
        Buffer.from(await trackingRes.arrayBuffer()),
        "euc-kr"
      )
      const $ = cheerio.load(utf8Data)
      const $content = $("#printarea")
      const $table = $content.find("table")

      if ($table.length === 0) {
        return new LayerDTO({
          isError: true,
          message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
        })
      }

      const $informationTable = $table.eq(0)
      const $progressTable = $table.eq(1)
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
          const time = this.parseDateTime(td.eq(3).text())
          const state = this.parseStatus(td.eq(5).text())
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

      const stateVO =
        progressVOs.length > 0 && progressVOs[0].state.name === "배달완료"
          ? progressVOs[0].state
          : this.parseStatus()

      const fromVO = new DeliveryLocationVO({
        name: this.parseLocationName(
          $informations.find("tr").eq(0).find("td").eq(0).text()
        ),
        time:
          progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
      })

      const toVO = new DeliveryLocationVO({
        name: this.parseLocationName(
          $informations.find("tr").eq(1).find("td").eq(0).text()
        ),
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

  private parseDateTime(value: string = "") {
    return StringHelper.trim(value + ":00")
  }

  private parseStatus(value?: string) {
    if (typeof value !== "string") {
      return DeliveryStateGenerator.getState("상품이동중")
    }
    if (value.includes("배송완료")) {
      return DeliveryStateGenerator.getState("배달완료")
    }
    return DeliveryStateGenerator.getState("상품이동중")
  }
}
