<script>
    import Conversation from "../lib/Conversation.svelte";
    import Usage from "../lib/Usage.svelte";
    import { conversation, openAIKey } from "../lib/stores";
    import { requestChatCompletion } from "../lib/gpt";
    import { onMount } from "svelte";

    onMount(() => {
        console.log("Running in the browser:", typeof window !== "undefined");
        const key = localStorage.getItem('openAIKey') || "";
        openAIKey.set(key);
        console.log(key);
        localStorage.setItem('hi', 'world');
        console.log(localStorage);
    })


    let content = "";
    const sendMessage = async () => {
        conversation.set([...$conversation, { role: "user", content }]);
        // conversation.update(c => c.push({sender:"User", message}));
        content = "";
        const response = await requestChatCompletion($conversation);
        console.log(response);
        conversation.set([
            ...$conversation,
            { role: "assistant", content: response },
        ]);
    };

    // hljs.highlightAll(); //TODO
</script>

<h1>Iris</h1>
<Conversation conversation={$conversation} />
<div id="input-container">
    <!-- svelte-ignore a11y-autofocus -->
    <textarea
        id="message"
        placeholder="Write your message here"
        autofocus
        bind:value={content}
    />
    <button on:click={sendMessage}>Chat</button>
    <Usage />
</div>
