<script>
    import { goto } from "$app/navigation";
    import "./styles.css";
    import { settings, conversation, usage, defaultValues } from "$lib/util/stores";

    let temperature = $settings.temperature;
    let model = $settings.model;
    let systemMessage = $conversation[0].content;

    const save = () => {
        settings.set({ temperature, model })
        conversation.update(conversation => {
            conversation[0].content = systemMessage;
            return conversation;
        })
        goto('/');
    }

    const clearStats = () => {
        usage.set(defaultValues.usage);
        goto('/');
    }
</script>

<h1>Settings</h1>
<p><b>Iris</b> is a wrapper for OpenAI's ChatGPT API. On this page you can edit any of the settings: system message, temperature, and model queried.</p>
<p>All settings, conversations, and your API key are stored in your browser's local storage, never anywhere else.</p>
<label for="system-message">System Message</label>
<input type="text" name="system-message" id="system-message" bind:value={systemMessage}>

<label for="temperature">Temperature</label>
<input type="range" min=0 max=1 step=0.1 id="temperature" bind:value={temperature}/>
<input type="number" name="temperature"
       min="0" max="1" step=0.1 bind:value={temperature}>


<label for="model">ML Model</label>
<select name="model" id="model" bind:value={model}>
    <option value="gpt-3.5-turbo">gpt-3.5-turbo (4k token context)</option>
    <option value="gpt-4">gpt-4 (8k token context)</option>
  </select>

{#if model == "gpt-4"}
<b>Make sure you actually need GPT4 for your purposes. It's 10x the cost, and much slower. It's only useful in special circumstances.</b><br>
{/if}

<button id="save" on:click={save} class="primary">Save Settings</button>

<hr>

<h2>Clear Stats</h2>
<button on:click={clearStats} class="danger">Clear Token/Cost Stats</button>
