"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const DeliveryLocationVO_1 = require("../../../../domains/vos/DeliveryLocationVO");
const DeliveryProgressVO_1 = require("../../../../domains/vos/DeliveryProgressVO");
const LayerDTO_1 = require("../../../../domains/dtos/LayerDTO");
const DeliveryDTO_1 = require("../../../../domains/dtos/DeliveryDTO");
const DeliveryStateGenerator_1 = require("../helpers/DeliveryStateGenerator");
const StringHelper_1 = require("../helpers/StringHelper");
class LotteScraper {
    constructor(serverHTTP) {
        this.serverHTTP = serverHTTP;
    }
    async getTrack(trackingNumber) {
        try {
            const trackingRes = await this.serverHTTP.get(`https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=${trackingNumber}`);
            if (trackingRes.status !== 200) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "운송장 조회에 실패하였습니다."
                });
            }
            const resData = await trackingRes.text();
            const $ = cheerio.load(resData);
            const $wrap = $(".contArea");
            const $informationTable = $wrap.find("table").eq(0);
            const $progressTable = $wrap.find("table").eq(1);
            const $informations = $informationTable.find("tbody").find("td");
            if ($informations.length === 1) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "해당 운송장이 존재하지 않거나 조회할 수 없습니다."
                });
            }
            const progressVOs = [];
            $progressTable
                .find("tbody")
                .find("tr")
                .each((_, element) => {
                const td = $(element).find("td");
                const description = StringHelper_1.default.trim(td.eq(3).text());
                const location = StringHelper_1.default.trim(td.eq(2).text());
                const time = this.parseDateTime(StringHelper_1.default.trim(td.eq(1).html()));
                const state = this.parseStatus(td.eq(0).text());
                progressVOs.push(new DeliveryProgressVO_1.default({
                    description,
                    location,
                    time,
                    state
                }));
            });
            const stateVO = progressVOs.length > 0
                ? progressVOs[0].state
                : this.parseStatus("상품준비중");
            const fromVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName($informations.eq(1).text()),
                time: progressVOs.length > 0 ? progressVOs[progressVOs.length - 1].time : ""
            });
            const toVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName($informations.eq(2).text()),
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
        return value;
    }
    parseDateTime(value) {
        const dateTime = value.split("&nbsp;");
        const date = dateTime[0];
        const time = dateTime[1] === "--:--" ? dateTime[1] + ":--" : dateTime[1] + ":00";
        return date + " " + time;
    }
    parseStatus(value) {
        if (typeof value !== "string") {
            return DeliveryStateGenerator_1.default.getState("상품이동중");
        }
        if (value.includes("상품접수")) {
            return DeliveryStateGenerator_1.default.getState("상품인수");
        }
        if (value.includes("배송 출발")) {
            return DeliveryStateGenerator_1.default.getState("배달출발");
        }
        if (value.includes("배달 완료")) {
            return DeliveryStateGenerator_1.default.getState("배달완료");
        }
        return DeliveryStateGenerator_1.default.getState("상품이동중");
    }
}
exports.default = LotteScraper;
//# sourceMappingURL=LotteScraper.js.map