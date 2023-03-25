import { writable } from 'svelte/store';

const conversation = writable([
    {
        role: "system",
        content: "You are a helpful AI assistant whose name is Iris."
    }
]);

const openAIKey = writable("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");


function createUsage() {
	const { subscribe, set, update } = writable({tokens: 0, cost: 0});
	return {
		subscribe,
		add: (tokens:number) => update(usage => {
			let totalTokens = usage.tokens + tokens
			return {
				tokens: totalTokens,
				cost: totalTokens * 0.000002
			}}
		),
		reset: () => set({tokens: 0, cost: 0})
	};
}
const usage = createUsage();


export { conversation, openAIKey, usage };