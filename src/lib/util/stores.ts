import { writable } from 'svelte/store';
import calculateCost from '$lib/util/pricing';

const defaultValues = {
	conversations: [
		{
			messages: [{
				role: "system",
				content: "You are a helpful AI assistant whose name is Iris."
			}],
			title: "New conversation",
			usage: {
				tokens: 0,
				cost: 0
			},
			settings: {
				temperature: 0.8,
				model: "gpt-3.5-turbo"
			}

		}
	],
	apiKeys: {
		openAI: "",
		kagi: ""
	},
	usage: {
		tokens: 0,
		cost: 0
	},
	currentConversationIndex: 0
}


const conversations = writable(defaultValues.conversations);

const currentConversationIndex = writable(defaultValues.currentConversationIndex);


const apiKeys = writable(defaultValues.apiKeys);


function createUsage() {
	const { subscribe, set, update } = writable(defaultValues.usage);
	return {
		subscribe,
		add: (usage:object, model:string) => update(pastUsage => {
			const cost = calculateCost(usage.prompt_tokens, usage.completion_tokens, model);
			const totalTokens = usage.prompt_tokens + usage.completion_tokens;
			return {
				tokens: pastUsage.tokens + totalTokens,
				cost: pastUsage.cost + cost
			}}
		),
		reset: () => set({tokens: 0, cost: 0}),
		set
	};
}
const usage = createUsage();




export { conversations, apiKeys, usage, currentConversationIndex, defaultValues };