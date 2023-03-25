<script>
    import { goto } from "$app/navigation";
    import { settings, conversation, usage, defaultValues } from "$lib/stores"
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

<label for="system-message">System Message</label>
<input type="text" name="system-message" id="system-message" bind:value={systemMessage}>

<label for="temperature">Temperature</label>
<input type="range" min=0 max=1 step=0.1 id="temperature" bind:value={temperature}/>
<input type="number" name="temperature"
       min="0" max="1" step=0.1 bind:value={temperature}>


<label for="model">ML Model</label>
<select name="model" id="model" bind:value={model}>
    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
    <option value="gpt-4" disabled>gpt-4</option>
  </select>

<button on:click={save}>Save</button>

<hr>

<h2>Clear Stats</h2>
<button on:click={clearStats}>Clear Token/Cost Stats</button>