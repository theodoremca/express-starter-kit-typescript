import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
export const chatService = (query: string) => {
  return new Promise(
      (resolve: (value: CreateCompletionResponse) => void, reject) => {
        const configuration = new Configuration({
          apiKey: "cwzuEuvFNEDXc8XjhOSJ",
        });
        const openai = new OpenAIApi(configuration);
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
      }
  );
};
// sk-qaMVokxfJIpgKFoUPvr1T3BlbkFJ