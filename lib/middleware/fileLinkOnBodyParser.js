"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLinkOnBodyParser = void 0;
const google_1 = require("../storage/google");
const fileLinkOnBodyParser = (req, res, next) => {
    let uploadedLength = 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fileNames = Object.keys(req.files || {});
    if (fileNames.length === 0)
        next();
    fileNames.forEach((name) => (0, google_1.uploadImageToFbStorage)(req.body[name], name)
        .then((url) => req.body[name] = url).then(() => {
        uploadedLength++;
        if (uploadedLength === fileNames.length)
            next();
    })
        .catch((err) => res.status(500).json({
        status: false,
        message: err.message,
    })));
};
exports.fileLinkOnBodyParser = fileLinkOnBodyParser;
//# sourceMappingURL=fileLinkOnBodyParser.js.map