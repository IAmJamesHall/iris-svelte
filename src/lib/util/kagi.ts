import { apiKeys } from './stores.js';

let apiKey = "";
apiKeys.subscribe(apiKeys => apiKey = apiKeys.kagi);

let engine = "daphne"; //or agnes
let summary_type = "summary" //or takeaway

export const requestSummary = async (content: string) => {
    return fetch("https://proxy.cors.sh/https://kagi.com/api/v0/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${apiKey}`
        },
        body: JSON.stringify({
            url: content,
            engine,
            summary_type,
        })
    })
    .then(response => response.json())
    .then(response => response.data)
    .catch(err => console.log(err))
};

    // return fetch('https://proxy.cors.sh/https://kagi.com/api/v0/summarize', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bot AAAAeOscGQQ.jUPCModDnooma5cGlT8mSFBZlG2CLu-emw_x1LbwqVQ'
    //     },
    //     body: JSON.stringify({
    //         url: 'https://genius.com/Brothertiger-mainsail-lyrics',
    //         engine: 'daphne'
    //     })
    // })
    // .then(response => response.json())
    // .then(response => response.data)
    // .catch(err => console.log(err))
