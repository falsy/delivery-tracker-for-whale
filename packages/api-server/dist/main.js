"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./frameworks/moduls/AppModule");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    const isDev = process.env.NODE_ENV === "development";
    const port = isDev ? 3000 : process.env.PORT;
    if (isDev) {
        app.enableCors({
            origin: "*"
        });
    }
    else {
        const allowedOrigins = [
            `chrome-extension://${process.env.EXTENSION_TEST_ID}`,
            `chrome-extension://${process.env.EXTENSION_ID}`
        ];
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true
        });
    }
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map