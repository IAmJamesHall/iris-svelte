<script>
    import Conversation from "$lib/Conversation.svelte";
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from "$lib/LocalStorage.svelte";
    import { conversations, apiKeys, defaultValues, currentConversationIndex } from "$lib/util/stores";
    import { requestChatCompletion } from "$lib/util/openAI";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import calculateCost from "$lib/util/pricing";

    let content = "";
    let conversationIndex = $currentConversationIndex;
    

    $: usage = $conversations[conversationIndex].usage;

    const sendMessage = async () => {
        let newConv = JSON.parse(JSON.stringify($conversations));
        newConv[conversationIndex].messages.push({ role: "user", content })
        conversations.set(newConv);
        console.log(`convos just after sending a msg: ${newConv}`);
        content = "";
        const { settings, messages } = $conversations[conversationIndex];
        const response = await requestChatCompletion(messages, settings.model, settings.temperature);
        console.log(response);
        newConv[conversationIndex].messages.push({ role: "assistant", content: response.message });
        

        // calculate cost
        const { prompt_tokens, completion_tokens } = response.usage;
        const cost = calculateCost(prompt_tokens, completion_tokens, response.model);
        const totalTokens = prompt_tokens + completion_tokens;
        const pastUsage = newConv[conversationIndex].usage;
        newConv[conversationIndex].usage = {
            tokens: pastUsage.tokens + totalTokens,
            cost: pastUsage.cost + cost
        }

        conversations.set(newConv);
        console.log(newConv);

        document.querySelector('#usage')?.scrollIntoView();

        //generate a title for the conversation
        if (newConv[conversationIndex].messages.length == 3) {
            console.log('generating title');
            console.log(messages);
            const newMessages = [...messages, {role: "user", content: "based on my first message, write a short title for this conversation. Do not include quotation marks, and make the title less than 20 characters long. If the person is just saying 'hi', simply put something like 'Greetings'"}];

            const title = await requestChatCompletion(newMessages);
            newConv[conversationIndex].title = title.message;
            conversations.set(newConv);
        }
    };

    const clearConversation = () => {
        conversations.update(conversations => {
            const systemMessage = conversations[conversationIndex].messages.slice(0, 1);
            conversations[conversationIndex].messages = systemMessage;
            return conversations;
    });
    }  

    const newConversation = () => {
        conversations.update(conversations => {
            conversations.push(defaultValues.conversations[0])
            return conversations;
        })
    }

    onMount(() => {
        if (!$apiKeys.openAI) {
            console.log('headed to /apikeys b/c its not in stores')
            goto('/apikeys');
    }
    })

    const changeConversation = (i) => {
        console.log(`changing conversation to ${i}`)
        currentConversationIndex.set(i);
        conversationIndex = i;
    }


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

<h1>{$conversations[conversationIndex].title}</h1>
<Conversation conversation={$conversations[conversationIndex].messages} />
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
    
    <Usage tokens={usage.tokens} cost={usage.cost} />
    
    <p><a href="/chat/settings">Settings</a></p>
    <hr>
    <h3>Conversations</h3>
    <ul>
        {#each $conversations as { title }, i}
        <li><button on:click={() => changeConversation(i)}>{title}</button></li>
        {/each}
    </ul>
    <button class="primary" on:click={newConversation}>New conversation</button>
    <LocalStorage />
</div>
