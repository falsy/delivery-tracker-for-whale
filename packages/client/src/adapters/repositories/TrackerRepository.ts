import { API_URL, TRACKER_LIST } from "@constants/index"
import ITracker from "@domains/entities/interfaces/ITracker"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ITrackerDTO, {
  ITrackerProps
} from "@domains/dtos/interfaces/ITrackerDTO"
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"
import LayerDTO from "@adapters/dtos/LayerDTO"
import TrackerDTO from "@adapters/dtos/TrackerDTO"
import IBrowserStorage from "../infrastructures/interfaces/IBrowserStorage"
import IClientHTTP from "../infrastructures/interfaces/IClientHTTP"

export default class TrackerRepository implements ITrackerRepository {
  private readonly clientHTTP: IClientHTTP
  private readonly browserStorage: IBrowserStorage

  constructor(clientHTTP: IClientHTTP, browserStorage: IBrowserStorage) {
    this.clientHTTP = clientHTTP
    this.browserStorage = browserStorage
  }

  async getDelivery(
    carrier: ICarrierDTO,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    try {
      const { id: carrierId } = carrier
      const res = await this.clientHTTP.get(
        `${API_URL}/tracker/${carrierId}/${trackingNumber}`
      )
      const { isError, message, data } = await res.json()

      if (!res.ok || isError) {
        return new LayerDTO({
          isError,
          message
        })
      }
      return new LayerDTO({
        data
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async getTrackers(): Promise<ILayerDTO<ITrackerDTO[]>> {
    try {
      const { data } = await this.browserStorage.getItem(TRACKER_LIST)
      const trackerList = data[TRACKER_LIST]

      if (typeof trackerList !== "string") {
        return new LayerDTO({
          data: []
        })
      }

      const parseJSON = JSON.parse(trackerList)
      if (!Array.isArray(parseJSON)) {
        return new LayerDTO({
          data: []
        })
      }

      return new LayerDTO({
        data: parseJSON.map((tracker: ITrackerDTO) => {
          return new TrackerDTO({
            id: tracker.id,
            carrierId: tracker.carrierId,
            label: tracker.label,
            trackingNumber: tracker.trackingNumber,
            memos: tracker.memos
          })
        })
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async patchTracker(
    id: string,
    trackerProps: ITrackerProps
  ): Promise<ILayerDTO<boolean>> {
    try {
      const { isError, message, data } = await this.getTrackers()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const newTrackers = data.map((tracker) => {
        return tracker.id === id ? { ...tracker, ...trackerProps } : tracker
      })

      const { data: innerData } = await this.browserStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async addTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    try {
      const { isError, message, data } = await this.getTrackers()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const trackerDTO = new TrackerDTO(tracker)
      const newTrackers = data.concat(trackerDTO)
      const parseString = JSON.stringify(newTrackers)

      const { data: innerData } = await this.browserStorage.setItem(
        TRACKER_LIST,
        parseString
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async updateTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    try {
      const { isError, message, data } = await this.getTrackers()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const newTrackers = data.map((target) => {
        return target.id === tracker.id ? tracker : target
      })

      const { data: innerData } = await this.browserStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    try {
      const { isError, message, data } = await this.getTrackers()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const newTrackers = data.filter((target) => {
        return target.id !== trackerId
      })

      const { data: innerData } = await this.browserStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async clearTrackers(): Promise<ILayerDTO<boolean>> {
    try {
      const { data } = await this.browserStorage.removeItem(TRACKER_LIST)

      return new LayerDTO({
        data: data
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
