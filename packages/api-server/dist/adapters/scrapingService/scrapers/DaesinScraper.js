"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const DeliveryDTO_1 = require("../../../domains/dtos/DeliveryDTO");
const DeliveryLocationVO_1 = require("../../../domains/vos/DeliveryLocationVO");
const DeliveryStateGenerator_1 = require("../helpers/DeliveryStateGenerator");
const LayerDTO_1 = require("../../../domains/dtos/LayerDTO");
const DeliveryProgressVO_1 = require("../../../domains/vos/DeliveryProgressVO");
const StringHelper_1 = require("../helpers/StringHelper");
class DaesinScraper {
    constructor(serverHTTP) {
        this.serverHTTP = serverHTTP;
    }
    async getTrack(trackingNumber) {
        try {
            const trackingRes = await this.serverHTTP.post(`https://www.ds3211.co.kr/freight/internalFreightSearch.ht?billno=${trackingNumber}`, {}, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            if (trackingRes.status !== 200) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "운송장 조회에 실패하였습니다."
                });
            }
            const utf8Data = iconv.decode(Buffer.from(await trackingRes.arrayBuffer()), "euc-kr");
            const $ = cheerio.load(utf8Data);
            const $content = $("#printarea");
            const $table = $content.find("table");
            if ($table.length === 0) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
                });
            }
            const $informationTable = $table.eq(0);
            const $progressTable = $table.eq(1);
            const $informations = $informationTable.find("tbody");
            const progressVOs = [];
            $progressTable
                .find("tbody")
                .find("tr")
                .each((i, element) => {
                if (i === 0)
                    return;
                const td = $(element).find("td");
                const description = StringHelper_1.default.trim(td.eq(2).text());
                const location = StringHelper_1.default.trim(td.eq(1).text());
                const time = this.parseDateTime(td.eq(3).text());
                const state = this.parseStatus(td.eq(5).text());
                progressVOs.push(new DeliveryProgressVO_1.default({
                    description,
                    location,
                    time,
                    state
                }));
            });
            progressVOs.reverse();
            const stateVO = progressVOs.length > 0 && progressVOs[0].state.name === "배달완료"
                ? progressVOs[0].state
                : this.parseStatus();
            const fromVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName($informations.find("tr").eq(0).find("td").eq(0).text()),
                time: progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
            });
            const toVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName($informations.find("tr").eq(1).find("td").eq(0).text()),
                time: stateVO.name === "배달완료" ? progressVOs[0].time : ""
            });
            const deliveryDTO = new DeliveryDTO_1.default({
                from: fromVO,
                to: toVO,
                progresses: progressVOs,
                state: stateVO
            });
            return new LayerDTO_1.default({
                data: deliveryDTO
            });
        }
        catch (error) {
            return new LayerDTO_1.default({
                isError: true,
                message: error.message
            });
        }
    }
    parseLocationName(value) {
        const short = value.substring(0, 4);
        return short + (short.includes("*") ? "" : "*");
    }
    parseDateTime(value = "") {
        return StringHelper_1.default.trim(value + ":00");
    }
    parseStatus(value) {
        if (typeof value !== "string") {
            return DeliveryStateGenerator_1.default.getState("상품이동중");
        }
        if (value.includes("배송완료")) {
            return DeliveryStateGenerator_1.default.getState("배달완료");
        }
        return DeliveryStateGenerator_1.default.getState("상품이동중");
    }
}
exports.default = DaesinScraper;
//# sourceMappingURL=DaesinScraper.js.map