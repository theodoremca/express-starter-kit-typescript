"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devMode = exports.versionPrefix = void 0;
const express_unless_1 = __importDefault(require("express-unless"));
const db_config_1 = __importDefault(require("./config/db.config"));
const auth_1 = require("./middleware/auth");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./middleware/errors");
const express_form_data_1 = __importDefault(require("express-form-data"));
const os_1 = __importDefault(require("os"));
const fileLinkOnBodyParser_1 = require("./middleware/fileLinkOnBodyParser");
exports.versionPrefix = "/api/v1";
exports.devMode = true;
const app = (0, express_1.default)();
const { STAGING_DB, DEV_DB } = process.env;
console.log({ STAGING_DB, DEV_DB });
(0, db_config_1.default)("" + DEV_DB).then(() => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const options = {
        uploadDir: os_1.default.tmpdir(),
        autoClean: true,
    };
    // parse data with connect-multiparty.
    app.use(express_form_data_1.default.parse(options));
    // delete from the request all empty files (size == 0)
    app.use(express_form_data_1.default.format());
    // change the file objects to fs.ReadStream
    app.use(express_form_data_1.default.stream());
    // union the body and the files
    app.use(express_form_data_1.default.union());
    app.use(fileLinkOnBodyParser_1.fileLinkOnBodyParser);
    app.get("/", (req, res) => {
        console.info("Get / hello success");
        res.send("Welcome Theodoremca Starter-kit");
    });
    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });
    // eslint-disablebrew tap heroku/brew && brew install heroku-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.use((0, express_unless_1.default)(auth_1.authenticateToken, {
        path: [
            { url: exports.versionPrefix + "/users/login", methods: ["POST"] },
            { url: exports.versionPrefix + "/users/register", methods: ["POST"] },
            { url: exports.versionPrefix + "/users/otpLogin", methods: ["POST"] },
            { url: exports.versionPrefix + "/users/verifyOTP", methods: ["POST"] },
        ],
    }));
    const status = "Ready to Go!";
    const port = process.env.PORT || 4000;
    const url = "http://localhost:" + port;
    console.log({ status, url, vUrl: url + exports.versionPrefix });
    (0, routes_1.default)(app);
    // // middleware for error responses
    app.use(errors_1.errorHandler);
    // listen for requests
    app.listen(port);
});
exports.default = app;
//# sourceMappingURL=app.js.map