"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
const connectToDb = (dbUrl) => mongoose_1.default
    .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.info("Database connected");
})
    .catch((error) => {
    console.error("db error", error);
    process.exit(1);
});
exports.default = connectToDb;
//# sourceMappingURL=db.config.js.map