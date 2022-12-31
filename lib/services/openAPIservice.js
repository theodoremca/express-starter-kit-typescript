"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const openai_1 = require("openai");
const chatService = (query) => {
    return new Promise((resolve, reject) => {
        const configuration = new openai_1.Configuration({
            apiKey: "cwzuEuvFNEDXc8XjhOSJ",
        });
        const openai = new openai_1.OpenAIApi(configuration);
        openai
            .createCompletion({
            model: "text-davinci-003",
            prompt: query,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
            .then((result) => resolve(result.data))
            .catch(reject);
    });
};
exports.chatService = chatService;
// sk-qaMVokxfJIpgKFoUPvr1T3BlbkFJ
//# sourceMappingURL=openAPIservice.js.map