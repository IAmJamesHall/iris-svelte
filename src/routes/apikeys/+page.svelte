<script>
    import { goto } from '$app/navigation';
    import { apiKeys as apiKeysStore, defaultValues } from '$lib/util/stores';
    import { onMount } from 'svelte';
    import LocalStorage from '$lib/LocalStorage.svelte';
    
    let apiKeys = defaultValues.apiKeys;

    onMount(() => {
        apiKeys = JSON.parse(localStorage.getItem('apiKeys')) || defaultValues.apiKeys;
    })
    

    const save = () => {
        apiKeysStore.set(apiKeys)
        goto('/chat');
    }

    
</script>

<h1>API Keys</h1>
{#if !apiKeys.openAI }
<h3>Enter your OpenAI API Key to use Iris</h3>
<p>If you don't have one already, you can acquire one at <a href="https://platform.openai.com/account/api-keys">this link</a>. Your API key is never sent anywhere except in requests to OpenAI's API, and is only stored in your browser's local storage.</p>
{/if}
<label for="openAI">OpenAI API Key</label>
<input type="text" id="openAI" bind:value={apiKeys.openAI}>


<label for="kagi">Kagi API Key</label>
<input type="text" id="kagi" bind:value={apiKeys.kagi}>

<button on:click={save} class="primary">Save</button>
<LocalStorage />