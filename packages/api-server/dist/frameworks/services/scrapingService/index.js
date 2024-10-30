"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CJLogisticsScraper_1 = require("./scrapers/CJLogisticsScraper");
const DaesinScraper_1 = require("./scrapers/DaesinScraper");
const EPostScraper_1 = require("./scrapers/EPostScraper");
const HanjinScraper_1 = require("./scrapers/HanjinScraper");
const KDExpScraper_1 = require("./scrapers/KDExpScraper");
const LogenScraper_1 = require("./scrapers/LogenScraper");
const LotteScraper_1 = require("./scrapers/LotteScraper");
class ScrapingService {
    static getTrack(serverHTTP, carrierName, trackingNumber) {
        switch (carrierName) {
            case "epost":
                return new EPostScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "cjlogistics":
                return new CJLogisticsScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "hanjin":
                return new HanjinScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "lotte":
                return new LotteScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "kdexp":
                return new KDExpScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "daesin":
                return new DaesinScraper_1.default(serverHTTP).getTrack(trackingNumber);
            case "logen":
                return new LogenScraper_1.default(serverHTTP).getTrack(trackingNumber);
        }
    }
}
exports.default = ScrapingService;
//# sourceMappingURL=index.js.map