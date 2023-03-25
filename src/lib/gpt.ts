import { openAIKey, usage } from './stores.js'
let apiKey = "";
openAIKey.subscribe(key => apiKey = key);

export const requestChatCompletion = async (messages:any[], temperature?:number, model?:string) => {
    if (!temperature) temperature = 1;
    if (!model) model = "gpt-3.5-turbo";
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