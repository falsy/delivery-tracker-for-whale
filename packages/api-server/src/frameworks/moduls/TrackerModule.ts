import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import fetch from "node-fetch"
import CarrierModel from "../models/CarrierModel"
import ServerHTTP from "../infrastructures/ServerHTTP"
import TrackerRepository from "../repositories/TrackerRepository"
import CarrierRepository from "../repositories/CarrierRepository"
import NTrackerUseCase from "../useCases/NTrackerUseCase"
import TrackerController from "../controllers/TrackerController"

@Module({
  imports: [SequelizeModule.forFeature([CarrierModel])],
  providers: [
    {
      provide: "IHttpServer",
      useValue: fetch
    },
    {
      provide: "IServerHTTP",
      useClass: ServerHTTP
    },
    {
      provide: "ITrackerRepository",
      useClass: TrackerRepository
    },
    {
      provide: "ICarrierRepository",
      useClass: CarrierRepository
    },
    {
      provide: "ITrackerUseCase",
      useClass: NTrackerUseCase
    }
  ],
  controllers: [TrackerController]
})
export default class TrackerModule {}
