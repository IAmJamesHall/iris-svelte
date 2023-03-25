<script>
    import { goto } from '$app/navigation';
    import { openAIKey as openAIKeyStore }  from '$lib/stores';
    let openAIKey = localStorage.getItem('openAIKey') || "";

    const save = () => {
        localStorage.setItem('openAIKey', openAIKey);
        openAIKeyStore.set(openAIKey);
        goto('/');
    }

    
</script>

<h1>API Keys</h1>
{#if !$openAIKeyStore }
<h3>Enter your OpenAI API Key to use Iris</h3>
<p>If you don't have one already, you can acquire one at <a href="https://platform.openai.com/account/api-keys">this link</a>. Your API key is never sent anywhere except in requests to OpenAI's API, and is only stored in your browser's local storage.</p>
{/if}
<label for="openAI">OpenAI API Key</label>
<input type="text" id="openAI" bind:value={openAIKey}>

<button on:click={save}>Save</button>