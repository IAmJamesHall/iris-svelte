import { goto } from '$app/navigation';
import { openAIKey, usage, settings } from './stores.js'

let apiKey = "";
openAIKey.subscribe(key => apiKey = key);

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
        usage.add(data.usage.total_tokens)
        return data.choices[0].message.content
      });
  };