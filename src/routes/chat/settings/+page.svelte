<script>
    import { goto } from "$app/navigation";
    import "./styles.css";
    import { settings, conversation, usage, defaultValues } from "$lib/util/stores";

    let temperature = $settings.temperature;
    let model = $settings.model;
    let systemMessage = $conversation[0].content;

    const save = () => {
        settings.set({ temperature, model });
        conversation.update((conversation) => {
            conversation[0].content = systemMessage;
            return conversation;
        });
        goto("/");
    };

    const clearStats = () => {
        usage.set(defaultValues.usage);
        goto("/");
    };


    // let personality;
</script>

<h1>Settings</h1>
<p>
    <b>Iris</b> is a wrapper for OpenAI's ChatGPT API. On this page you can edit
    any of the settings: system message, temperature, and model queried.
</p>
<p>
    All settings, conversations, and your API key are stored in your browser's
    local storage, never anywhere else.
</p>
<label for="system-message">System Message</label>
<input
    type="text"
    name="system-message"
    id="system-message"
    bind:value={systemMessage}
/>
<!-- <fieldset>
    <legend>Select a personality</legend>

    {#each personalities as {name, systemMessage, description}}
    <div>
        <input type="radio" bind:group={personality} id={name} name="personality" value={systemMessage} />
        <label for={name}>{description}</label>
    </div>
    {/each}

</fieldset> -->

<label for="temperature">Temperature</label>
<input
    type="range"
    min="0"
    max="1"
    step="0.1"
    id="temperature"
    bind:value={temperature}
/>
<input
    type="number"
    name="temperature"
    min="0"
    max="1"
    step="0.1"
    bind:value={temperature}
/>

<label for="model">ML Model</label>
<select name="model" id="model" bind:value={model}>
    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
    <option value="gpt-4" disabled>gpt-4</option>
</select>

<button id="save" class="primary" on:click={save}>Save Settings</button>

<hr />

<h2>Clear Stats</h2>
<button class="danger" on:click={clearStats}>Clear Token/Cost Stats</button>
