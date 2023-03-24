<script>
    import Conversation from "../lib/Conversation.svelte";
    import Usage from "../lib/Usage.svelte";
    import { conversation } from "../lib/stores"
    import { requestChatCompletion } from "../lib/gpt";
    let content = "";
    const sendMessage = async () => {
        conversation.set([...$conversation, {role:"user", content}])
        // conversation.update(c => c.push({sender:"User", message}));
        content = "";
        const response = await requestChatCompletion($conversation);
        console.log(response);
        conversation.set([...$conversation, {role: "assistant", content: response}])
    }

    hljs.highlightAll();
</script>

<div id="container">
    <!-- <button id="login" onclick="login()">Login</button> -->
    <h1>Iris</h1>
    <Conversation conversation={$conversation}/>
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
</div>
