<script>
    import Conversation from "$lib/Conversation.svelte";
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from "$lib/LocalStorage.svelte";
    import { conversation, apiKeys } from "$lib/util/stores";
    import { requestChatCompletion } from "$lib/util/openAI";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

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
        // window.scrollTo(0, document.body.scrollHeight);
        document.querySelector('#usage')?.scrollIntoView();
    };

    const clearConversation = () => {
        conversation.update((conversation) => [conversation[0]]);
    };

    onMount(() => {
        if (!$apiKeys.openAI) {
        goto('/apikeys');
    }
    })


    //Handle Enter to submit & Shift-Enter for newline
    let enter_key_down = false;
    let shift_key_down = false;
    function onKeyDown(e) {
        switch (e.key) {
            case "Enter":
                e.preventDefault();
                enter_key_down = true;
                break;
            case "Shift":
                shift_key_down = true;
                break;
        }
        if (shift_key_down && enter_key_down) {
            content += "\n";
        } else if (enter_key_down && !shift_key_down) {
            sendMessage();
        }
    }

    function onKeyUp(e) {
        switch (e.key) {
            case "Enter":
                enter_key_down = false;
                break;
            case "Shift":
                shift_key_down = false;
                break;
        }
    }

    // hljs.highlightAll(); //TODO
</script>

<!-- <svelte:window
    on:keydown={onKeyDown}
    on:keyup={onKeyUp}
/> -->
<h1>Iris</h1>
<Conversation conversation={$conversation} />
<div id="input-container">
    <!-- svelte-ignore a11y-autofocus -->
    <textarea
        id="message"
        placeholder="Write your message here"
        autofocus
        bind:value={content}
        on:keydown={onKeyDown}
        on:keyup={onKeyUp}
    />
    <button on:click={sendMessage} class="primary">Chat (Enter)</button>
    <button on:click={clearConversation} class="danger">Clear Conversation</button>
    <Usage api="openAI" />
    <p><a href="/chat/settings">Settings</a></p>
    <LocalStorage />
</div>
