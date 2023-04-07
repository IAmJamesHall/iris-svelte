import { apiKeys } from './stores.js';

let apiKey = "";
apiKeys.subscribe(apiKeys => apiKey = apiKeys.kagi);

let engine = "daphne"; //or agnes
let summary_type = "summary" //or takeaway

/**
 * Summarizes the provided URL
 * @param url url to summarize
 * @returns summary of the url, provided by Kagi Universal Summarizer
 */
export const requestSummary = async (url: string) => {
    return fetch("https://us-central1-smart-grin-379008.cloudfunctions.net/kagi-summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${apiKey}`
        },
        body: JSON.stringify({
            apiKey,
            url,
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
