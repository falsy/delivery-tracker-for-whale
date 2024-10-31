"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const DeliveryDTO_1 = require("../../../domains/dtos/DeliveryDTO");
const DeliveryLocationVO_1 = require("../../../domains/vos/DeliveryLocationVO");
const DeliveryStateGenerator_1 = require("../helpers/DeliveryStateGenerator");
const LayerDTO_1 = require("../../../domains/dtos/LayerDTO");
const html_entities_1 = require("html-entities");
const DeliveryProgressVO_1 = require("../../../domains/vos/DeliveryProgressVO");
const StringHelper_1 = require("../helpers/StringHelper");
class EPostScraper {
    constructor(serverHTTP) {
        this.serverHTTP = serverHTTP;
    }
    async getTrack(trackingNumber) {
        try {
            const trackingRes = await this.serverHTTP.get(`https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=${trackingNumber}`);
            if (trackingRes.status !== 200) {
                return new LayerDTO_1.default({
                    isError: true,
                    message: "운송장 조회에 실패하였습니다."
                });
            }
            const resData = await trackingRes.text();
            const $ = cheerio.load(resData);
            const $informationTable = $("#print").find("table");
            const $progressTable = $("#processTable");
            const $informations = $informationTable.find("td");
            if ($informations.length === 0) {
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
                const descriptionText = StringHelper_1.default.trim(td.eq(3).text());
                const description = descriptionText.includes("소포 물품 사진")
                    ? "접수"
                    : descriptionText;
                const location = td.eq(2).find("a").eq(0).text();
                const time = this.parseDateTime(td.eq(0).html() + " " + td.eq(1).html());
                const state = this.parseStatus(td.eq(3).text());
                progressVOs.push(new DeliveryProgressVO_1.default({
                    description,
                    location,
                    time,
                    state
                }));
            });
            progressVOs.reverse();
            const stateVO = progressVOs.length > 0
                ? progressVOs[0].state
                : this.parseStatus("상품준비중");
            const from = (0, html_entities_1.decode)($informations.eq(0).html()).split("<br>");
            const fromVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName(from[0]),
                time: this.parseDateTime(from[1])
            });
            const to = (0, html_entities_1.decode)($informations.eq(1).html()).split("<br>");
            const toVO = new DeliveryLocationVO_1.default({
                name: this.parseLocationName(to[0]),
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
    parseDateTime(value) {
        const dateTime = value.split(" ");
        const time = dateTime.length > 1 ? " " + dateTime[1] + ":00" : "";
        return dateTime[0].replace(/\./g, "-") + time;
    }
    parseStatus(value) {
        if (typeof value !== "string") {
            return DeliveryStateGenerator_1.default.getState("상품이동중");
        }
        if (value.includes("상품준비중")) {
            return DeliveryStateGenerator_1.default.getState("상품준비중");
        }
        if (value.includes("접수")) {
            return DeliveryStateGenerator_1.default.getState("상품인수");
        }
        if (value.includes("배달준비")) {
            return DeliveryStateGenerator_1.default.getState("배달출발");
        }
        if (value.includes("배달완료")) {
            return DeliveryStateGenerator_1.default.getState("배달완료");
        }
        return DeliveryStateGenerator_1.default.getState("상품이동중");
    }
}
exports.default = EPostScraper;
//# sourceMappingURL=EPostScraper.js.map