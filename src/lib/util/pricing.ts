// price per token for each openAI model
const modelPrices = {
	"gpt-3.5-turbo": {
        prompt: 0.0000015,
        completion: 0.0000015
    },
	"gpt-4": {
        prompt: .00003,
        completion: 0.00006
    },
    "gpt-3.5-turbo-16k": {
        prompt: 0.000003,
        completion: 0.000003
    },
}


const calculateCost = (promptTokens:number, completionTokens:number, model:string) => {
    const { prompt, completion } = modelPrices[model];
    const totalCost = (promptTokens * prompt) + (completionTokens * completion);
    return totalCost;
}

export default calculateCost;