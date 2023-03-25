import { writable } from 'svelte/store';
// import { key } from './secrets';

const conversation = writable([
    {
        role: "system",
        content: "You are a helpful AI assistant whose name is Iris."
    }
]);


const openAIKey = writable("");


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

const settings = writable({
	temperature: 0.8, 
	model: "gpt-3.5-turbo"
})


export { conversation, openAIKey, usage, settings };