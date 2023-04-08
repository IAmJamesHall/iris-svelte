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
    return fetch("https://us-central1-smart-grin-379008.cloudfunctions.net/iris-summarizer-kagi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "kagiApiKey": apiKey,
            url
        })
    })
    .then(response => response.json())
    .then(response => response.data)
    .catch(err => console.log(err))
};
