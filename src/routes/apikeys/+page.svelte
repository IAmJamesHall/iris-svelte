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
        if (apiKeys.openAI && !apiKeys.kagi) goto('/chat');
        else goto('/');
    }

    
</script>

<h1 class="subtitle">API Keys</h1>
{#if !apiKeys.openAI }
<div class="notification is-warning">
<h3 class="subtitle is-5">Enter your OpenAI API Key to use Iris</h3>
<p>If you don't have one already, you can acquire one at <a href="https://platform.openai.com/account/api-keys">this link</a>. Your API key is never sent anywhere except in requests to OpenAI's API, and is only stored in your browser's local storage.</p>
</div>
{/if}
<div class="field">
<label for="openAI">OpenAI API Key</label>
<div class="control">
<input class="input" type="text" id="openAI" bind:value={apiKeys.openAI}>
</div>
</div>


<div class="field">
<label for="kagi">Kagi API Key</label>
<div class="control">
<input class="input" type="text" id="kagi" bind:value={apiKeys.kagi}>
</div>
</div>

<button on:click={save} class="button is-primary">Save</button>
<LocalStorage />