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
	apiKeys: {
		openAI: "",
		kagi: ""
	},
	usage: {
		openAI: {
			tokens: 0,
			cost: 0
		},
		kagi: {
			tokens: 0,
			cost: 0
		}
	}
}


const conversation = writable(defaultValues.conversation);




const apiKeys = writable(defaultValues.apiKeys);


function createUsage() {
	const { subscribe, set, update } = writable(defaultValues.usage);
	return {
		subscribe,
		add: (tokens: number, api: string) => update(usageObj => {
			let costPerToken;
			if (api == "openAI") costPerToken = 0.000002;
			else if (api == "kagi") costPerToken = 0.00003;
			else throw new Error('Incorrect api string given in usage(add) function');
			let totalTokens = usageObj[api].tokens + tokens
			usageObj[api] = {
				tokens: totalTokens,
				cost: totalTokens * costPerToken
			}
			return usageObj;
		}
		),
		reset: () => set(defaultValues.usage),
		set
	};
}
const usage = createUsage();

const settings = writable(defaultValues.settings);

//     const personalities = [
//         {
//             name: "coder",
//             systemMessage: `You are an AI programming assistant.
// Follow the user's requirements carefully & to the letter
// First think step-by-step–describe your plan for what to build in pseudocode, written out in great detail
// Then output the code in a single code block
// Minimize other prose`,
//             description: "Programming assistant"
//         },
//         {
//             name: "custom",
//             systemMessage: conversation[0].content,
//             description: "Custom"
//         }
//     ];




export { conversation, apiKeys, usage, settings, defaultValues };