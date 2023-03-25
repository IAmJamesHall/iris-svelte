import { writable } from 'svelte/store';

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
	openAIKey: "",
	usage: {tokens: 0, cost: 0},
	}

const conversation = writable(defaultValues.conversation);





const openAIKey = writable("");


function createUsage() {
	const { subscribe, set, update } = writable(defaultValues.usage);
	return {
		subscribe,
		add: (tokens:number) => update(usage => {
			let totalTokens = usage.tokens + tokens
			return {
				tokens: totalTokens,
				cost: totalTokens * 0.000002
			}}
		),
		reset: () => set({tokens: 0, cost: 0}),
		set
	};
}
const usage = createUsage();

const settings = writable(defaultValues.settings);




export { conversation, openAIKey, usage, settings, defaultValues };