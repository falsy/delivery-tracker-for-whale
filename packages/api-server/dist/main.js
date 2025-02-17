"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./frameworks/moduls/AppModule");
const compression = require("compression");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    const isDev = process.env.NODE_ENV === "development";
    const port = isDev ? 3000 : process.env.PORT;
    app.enableCors({
        origin: "*",
        credentials: true,
        exposedHeaders: ["ETag"]
    });
    app.use(compression({
        threshold: 1000
    }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map