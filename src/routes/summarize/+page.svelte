<script>
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from "$lib/LocalStorage.svelte";
    import { apiKeys } from "$lib/util/stores";
    import requestSummary from "$lib/util/kagi";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let url = "";
    let content = {
        output: "",
        tokens: 0
    };
    let emptyContent = content;
    let loading = false;

    const summarize = async () => {
        loading = true;
        content = emptyContent;
        content = await requestSummary(url);
        loading = false;
    };

    onMount(() => {
        if (!$apiKeys.kagi) {
        goto('/apikeys');
    }
    })


</script>


<h1>Kagi Summarize</h1>
<div id="input-container">
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" placeholder="URL to summarize" bind:value={url} autofocus />



    <button on:click={summarize} class="primary">Summarize</button>
    <div>{content.output}</div>
    {#if loading == true}
    <h3>Loading</h3>
    {/if}
    <p><a href="/summarize/settings">Settings</a></p>
    <LocalStorage />
</div>
