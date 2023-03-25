<script>
    import { openAIKey as openAIKeyStore }  from '$lib/stores';
    let openAIKey = localStorage.getItem('openAIKey') || "";

    const save = () => {
        localStorage.setItem('openAIKey', openAIKey);
        openAIKeyStore.set(openAIKey);
    }

    
</script>

<h1>API Keys</h1>
<h3>Enter your API Keys</h3>

<label for="openAI">OpenAI API Key</label>
<input type="text" id="openAI" bind:value={openAIKey}>

<button on:click={save}>Save</button>