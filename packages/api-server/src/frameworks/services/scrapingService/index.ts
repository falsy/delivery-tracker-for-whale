import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import IServerHTTP from "@frameworks/infrastructures/interfaces/IServerHTTP"
import CJLogisticsCrawler from "./scrapers/CJLogisticsScraper"
import DaesinCrawler from "./scrapers/DaesinScraper"
import EPostCrawler from "./scrapers/EPostScraper"
import HanjinCrawler from "./scrapers/HanjinScraper"
import KDExpCrawler from "./scrapers/KDExpScraper"
import LogenCrawler from "./scrapers/LogenScraper"
import LotteCrawler from "./scrapers/LotteScraper"

export default class ScrapingService {
  static getTrack(
    serverHTTP: IServerHTTP,
    carrierName: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    switch (carrierName) {
      case "epost":
        return new EPostCrawler(serverHTTP).getTrack(trackingNumber)
      case "cjlogistics":
        return new CJLogisticsCrawler(serverHTTP).getTrack(trackingNumber)
      case "hanjin":
        return new HanjinCrawler(serverHTTP).getTrack(trackingNumber)
      case "lotte":
        return new LotteCrawler(serverHTTP).getTrack(trackingNumber)
      case "kdexp":
        return new KDExpCrawler(serverHTTP).getTrack(trackingNumber)
      case "daesin":
        return new DaesinCrawler(serverHTTP).getTrack(trackingNumber)
      case "logen":
        return new LogenCrawler(serverHTTP).getTrack(trackingNumber)
    }
  }
}
