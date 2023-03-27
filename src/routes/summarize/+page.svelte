<script>
    import Usage from "$lib/Usage.svelte";
    import LocalStorage from "$lib/LocalStorage.svelte";
    import { apiKeys } from "$lib/util/stores";
    import { requestSummary } from "$lib/util/kagi";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let url = "";
    let content = {
        output: "",
        tokens: 0
    };
    const summarize = async () => {
        content = await requestSummary(url);
        console.log(content);
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
    <p><a href="/summarize/settings">Settings</a></p>
    <LocalStorage />
</div>
