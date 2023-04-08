// price per token for each openAI model
const modelPrices = {
	"gpt-3.5-turbo": {
        prompt: 0.000002,
        completion: 0.000002
    },
	"gpt-4": {
        prompt: .00003,
        completion: 0.00006
    }
}


const calculateCost = (promptTokens:number, completionTokens:number, model:string) => {
    const { prompt, completion } = modelPrices[model];
    const totalCost = (promptTokens * prompt) + (completionTokens * completion);
    return totalCost;
}

export default calculateCost;