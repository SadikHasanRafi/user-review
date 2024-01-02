"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = __importDefault(require("."));
const config_1 = __importDefault(require("./app/config/config"));
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.DATABASE_URL);
        await _1.default.listen(config_1.default.PORT, () => {
            console.log("server is running perfectly fine.");
        });
    }
    catch (error) {
        console.error("🚀 ~ file: server.ts:10 ~ main ~ error:", error);
    }
}
main();
