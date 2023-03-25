<script>
    import { goto } from "$app/navigation";
    import { settings } from "$lib/stores"
    let temperature = $settings.temperature;
    let model = $settings.model;

    const save = () => {
        settings.set({ temperature, model })
        goto('/');
    }
</script>

<h1>Settings</h1>
<label for="temperature">Temperature</label>
<input type="range" min=0 max=1 step=0.1 id="temperature" bind:value={temperature}/>
<input type="number" name="temperature"
       min="0" max="1" step=0.1 bind:value={temperature}>

<hr>
<label for="model">ML Model</label>
<select name="model" id="model" bind:value={model}>
    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
  </select>

<button on:click={save}>Save</button>