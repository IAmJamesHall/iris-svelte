import { writable } from 'svelte/store';
import calculateCost from '$lib/util/pricing';

const defaultValues = {
	settings: {
			temperature: 0.8,
			model: "gpt-3.5-turbo",
		},
	conversation: [
		{
			role: "system",
			content: "You are a helpful AI assistant whose name is Iris."
		}
	],
	apiKeys: {
		openAI: "",
		kagi: ""
	},
	usage: {tokens: 0, cost: 0},
	}


const conversation = writable(defaultValues.conversation);





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

const settings = writable(defaultValues.settings);




export { conversation, apiKeys, usage, settings, defaultValues };