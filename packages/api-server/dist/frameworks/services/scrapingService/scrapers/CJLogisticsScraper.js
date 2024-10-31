"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const tough_cookie_1 = require("tough-cookie");
const DeliveryDTO_1 = require("../../../../domains/dtos/DeliveryDTO");
const DeliveryLocationVO_1 = require("../../../../domains/vos/DeliveryLocationVO");
const DeliveryStateGenerator_1 = require("../helpers/DeliveryStateGenerator");
const LayerDTO_1 = require("../../../../domains/dtos/LayerDTO");
const DeliveryProgressVO_1 = require("../../../../domains/vos/DeliveryProgressVO");
class CJLogisticsScraper {
    constructor(serverHTTP) {
        this.serverHTTP = serverHTTP;
    }
    async getTrack(trackingNumber) {
        try {
            const tracikng = await this.serverHTTP.get("https://www.cjlogistics.com/ko/tool/parcel/tracking");
            if (tracikng.status !== 200) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "운송장 조회에 실패하였습니다."
                });
            }
            const cookie = tracikng.headers
                .get("set-cookie")
                ?.split(",")
                .map((c) => tough_cookie_1.Cookie.parse(c))
                .map((c) => c?.cookieString() ?? null)
                .join("; ") ?? null;
            const $ = cheerio.load(await tracikng.text());
            const csrf = $("input[name=_csrf]").val();
            const trackingRes = await this.serverHTTP.post(`https://www.cjlogistics.com/ko/tool/parcel/tracking-detail?paramInvcNo=${trackingNumber}&_csrf=${csrf}`, {}, {
                headers: {
                    Cookie: cookie
                }
            });
            if (trackingRes.status !== 200) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "운송장 조회에 실패하였습니다."
                });
            }
            const resData = await trackingRes.json();
            const informationTable = resData.parcelResultMap.resultList;
            const progressTable = resData.parcelDetailResultMap.resultList;
            if (informationTable.length === 0) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
                });
            }
            const progressVOs = progressTable
                .map((row) => {
                return new DeliveryProgressVO_1.default({
                    description: row.crgNm,
                    location: row.regBranNm,
                    time: row.dTime,
                    state: this.parseStatus(row.crgSt)
                });
            })
                .reverse();
            const stateVO = progressVOs.length > 0 ? progressVOs[0].state : this.parseStatus();
            const fromVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName(informationTable[0].sendrNm),
                time: progressTable.length > 0 ? progressTable[0].dTime : ""
            });
            const toVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName(informationTable[0].rcvrNm),
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
    parseStatus(value) {
        if (typeof value !== "string") {
            return DeliveryStateGenerator_1.default.getState("상품준비중");
        }
        if (["41", "42", "44"].includes(value)) {
            return DeliveryStateGenerator_1.default.getState("상품이동중");
        }
        if (value === "11") {
            return DeliveryStateGenerator_1.default.getState("상품인수");
        }
        if (value === "82") {
            return DeliveryStateGenerator_1.default.getState("배달출발");
        }
        if (value === "91") {
            return DeliveryStateGenerator_1.default.getState("배달완료");
        }
        return DeliveryStateGenerator_1.default.getState("상품준비중");
    }
}
exports.default = CJLogisticsScraper;
//# sourceMappingURL=CJLogisticsScraper.js.map