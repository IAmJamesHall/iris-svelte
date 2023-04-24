<script>
    import Conversation from "$lib/Conversation.svelte";
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from "$lib/LocalStorage.svelte";
    import {
        conversations,
        apiKeys,
        defaultValues,
        currentConversationIndex,
    } from "$lib/util/stores";
    import { requestChatCompletion } from "$lib/util/openAI";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import calculateCost from "$lib/util/pricing";

    let content = "";
    let conversationIndex = $currentConversationIndex;

    $: usage = $conversations[conversationIndex].usage;

    const sendMessage = async () => {
        const chatButton = document.querySelector('#chat');
        chatButton.classList.add('is-loading');

        let newConv = JSON.parse(JSON.stringify($conversations));
        newConv[conversationIndex].messages.push({ role: "user", content });
        conversations.set(newConv);
        console.log(`convos just after sending a msg: ${newConv}`);
        content = "";
        const { settings, messages } = $conversations[conversationIndex];
        const response = await requestChatCompletion(
            messages,
            settings.model,
            settings.temperature
        );
        console.log(response);
        newConv[conversationIndex].messages.push({
            role: "assistant",
            content: response.message,
        });

        // calculate cost
        const { prompt_tokens, completion_tokens } = response.usage;
        const cost = calculateCost(
            prompt_tokens,
            completion_tokens,
            response.model
        );
        const totalTokens = prompt_tokens + completion_tokens;
        const pastUsage = newConv[conversationIndex].usage;
        newConv[conversationIndex].usage = {
            tokens: pastUsage.tokens + totalTokens,
            cost: pastUsage.cost + cost,
        };

        conversations.set(newConv);
        chatButton.classList.remove('is-loading');

        document.querySelector("#usage")?.scrollIntoView();

        //generate a title for the conversation
        if (newConv[conversationIndex].messages.length == 3) {
            console.log("generating title");
            console.log(messages);
            const newMessages = [
                ...messages,
                {
                    role: "user",
                    content:
                        "based on my first message, write a short title for this conversation. Do not include quotation marks, and make the title less than 20 characters long. If the person is just saying 'hi', simply put something like 'Greetings'",
                },
            ];

            const title = await requestChatCompletion(newMessages);
            newConv[conversationIndex].title = title.message;
            conversations.set(newConv);
        }
    };

    const clearConversation = () => {
        conversations.update((conversations) => {
            const systemMessage = conversations[
                conversationIndex
            ].messages.slice(0, 1);
            conversations[conversationIndex].messages = systemMessage;
            return conversations;
        });
    };

    const newConversation = () => {
        conversations.update((conversations) => {
            conversations.push(defaultValues.conversations[0]);
            return conversations;
        });
    };

    onMount(() => {
        if (!$apiKeys.openAI) {
            console.log("headed to /apikeys b/c its not in stores");
            goto("/apikeys");
        }
    });

    const changeConversation = (i) => {
        console.log(`changing conversation to ${i}`);
        currentConversationIndex.set(i);
        conversationIndex = i;
    };

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
</script>

<h1 class="subtitle is-4">{$conversations[conversationIndex].title}</h1>
<div class="block">
    <Conversation conversation={$conversations[conversationIndex].messages} />
</div>
<div class="block">
    <!-- svelte-ignore a11y-autofocus -->
    <textarea
        class="textarea"
        id="message"
        placeholder="Write your message here"
        autofocus
        bind:value={content}
        on:keydown={onKeyDown}
        on:keyup={onKeyUp}></textarea>
</div>
{#if $conversations[conversationIndex].settings.model == "gpt-4"}
<div class="block">
    <div class="notification is-warning">
        <!-- <button class="delete"></button> -->
        GPT-4 is enabled. Make sure you actually want GPT-4 before continuing.
      </div>
</div>
{/if}
<div class="block">
    <button class="button is-primary" id="chat" on:click={sendMessage}
        >Chat (Enter)</button>  
    <div class="float-right">
        <a href="/chat/settings" class="button is-outlined">Settings</a>
        <button on:click={clearConversation} class="button is-danger is-light is-outlined">
            Clear Conversation
        </button>
    </div>
</div>
<div class="block">
    <Usage tokens={usage.tokens} cost={usage.cost} />
</div>

<hr />

<div class="block">
<aside class="menu">
    <p class="menu-label">
      Conversations
    </p>
    <ul class="menu-list">
        {#each $conversations as { title }, i}
        <li>
            <a on:click={() => changeConversation(i)}>{title}</a>
        </li>
    {/each}
    </ul>
    
  </aside>
</div>
<button class="button" on:click={newConversation}>New conversation</button>
<LocalStorage />

<style>
    .float-right {
        float: right;
    }
</style>
