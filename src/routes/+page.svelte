<script>
    import Conversation from "$lib/Conversation.svelte";
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from '$lib/LocalStorage.svelte';
    import { conversation } from "$lib/stores";
    import { requestChatCompletion } from "$lib/gpt";





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

    const clearConversation = () => {
        conversation.update(conversation => [conversation[0]]);
    }

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
    <button on:click={clearConversation}>Clear</button>
    <Usage />
    <LocalStorage />
</div>
