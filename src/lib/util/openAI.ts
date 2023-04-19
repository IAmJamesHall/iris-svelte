import { apiKeys, usage, settings } from './stores.js'

let apiKey = "";
apiKeys.subscribe(apiKeys => apiKey = apiKeys.openAI);

let model = "gpt-3.5-turbo";
let temperature = 0.8
settings.subscribe(settings => {
  model = settings.model;
  temperature = settings.temperature;
})

console.log('apiKey:' + apiKey);

export const requestChatCompletion = async (messages:any[]) => {
    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) { return `ERROR: ${data.error.message}` }
        // usage.add(data.usage, model)
        return {
          message: data.choices[0].message.content,
          usage: data.usage,
          model: model
        }
      })
      .catch((error) => {
        return error.message;
      })
  };