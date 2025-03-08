import { NestFactory } from "@nestjs/core"
import { AppModule } from "./frameworks/moduls/AppModule"
import * as compression from "compression"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const isDev = process.env.NODE_ENV === "development"
  const port = isDev ? 3000 : process.env.PORT

  const allowedOrigins = [
    `chrome-extension://${process.env.EXTENSION_ID}`,
    `${process.env.DEV_CLIENT_URL}`
  ]

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    // origin: "*",
    credentials: true,
    exposedHeaders: ["ETag"]
  })

  app.use(
    compression({
      threshold: 1000
    })
  )

  console.log("port:", port)
  await app.listen(port)
}
bootstrap()
