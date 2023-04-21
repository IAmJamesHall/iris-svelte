<script>
    import { goto } from "$app/navigation";
    import "./styles.css";
    import {
        conversations,
        usage,
        defaultValues,
        currentConversationIndex,
    } from "$lib/util/stores";

    const conversationIndex = $currentConversationIndex;
    console.log($currentConversationIndex);
    let settings = $conversations[conversationIndex].settings;
    console.log(settings);
    let temperature = settings.temperature;
    let model = settings.model;
    let systemMessage = $conversations[conversationIndex].messages[0].content;
    let title = $conversations[conversationIndex].title;

    const save = () => {
        conversations.update((conversations) => {
            const newSettings = {
                temperature,
                model,
            };
            conversations[conversationIndex].settings = newSettings;
            conversations[conversationIndex].messages[0].content =
                systemMessage;
            conversations[conversationIndex].title = title;
            return conversations;
        });
        // settings.set({ temperature, model })
        // conversations.update(conversations => {
        //     conversations[0].content = systemMessage;
        //     return conversations;
        // })
        goto("/chat");
    };

    const clearStats = () => {
        usage.set(defaultValues.usage);
        goto("/chat");
    };

    const deleteConversation = () => {
        $conversations.splice(conversationIndex, 1);
        const newConv = $conversations;
        conversations.set(newConv);
        currentConversationIndex.set(0);
        if ($conversations.length == 0) {
            conversations.set(defaultValues.conversations);
        }
        goto("/chat");
    };
</script>

<h1 class="title is-2">Settings</h1>
<div class="block">
    <p>
        <b>Iris</b> is a wrapper for OpenAI's ChatGPT API. On this page you can edit
        any of the settings: system message, temperature, and model queried.
    </p>
    <p>
        All settings, conversations, and your API key are stored in your
        browser's local storage, never anywhere else.
    </p>
</div>

<div class="field">
    <label for="title">Title for conversation</label>
    <div class="control">
        <input
            class="input"
            type="text"
            name="title"
            id="title"
            bind:value={title}
        />
    </div>
</div>

<div class="field">
    <label for="system-message">System Message</label>
    <div class="control">
        <input
            type="text"
            class="input"
            name="system-message"
            id="system-message"
            bind:value={systemMessage}
        />
    </div>
</div>

<div class="field">
    <label for="temperature">Temperature: {temperature}</label>
    <div class="control">
        <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            id="temperature"
            bind:value={temperature}
        />
    </div>
</div>

<div class="field">
    <label for="model">ML Model</label>
    <div class="control">
        <div class="select is-rounded">
            <select name="model" id="model" bind:value={model}>
                <option value="gpt-3.5-turbo"
                    >gpt-3.5-turbo (4k token context)</option
                >
                <option value="gpt-4">gpt-4 (8k token context)</option>
            </select>
        </div>
    </div>

    {#if model == "gpt-4"}
        <div class="control">
            <div class="notification is-warning">
                <!-- <button class="delete"></button> -->
                Make sure you actually need GPT4 for your purposes. It's 10x the
                cost, and much slower. It's only useful in special circumstances.
            </div>
        </div>
    {/if}
</div>
<div class="field is-grouped">
    <div class="control">
    <button class="button is-primary" id="save" on:click={save}
        >Save Settings</button
    >
</div>
<div class="control">
    <button on:click={deleteConversation} class="button is-danger is-light">Delete current conversation</button>
</div>
</div>
