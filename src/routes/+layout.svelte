<script>
    import { onMount } from "svelte";
    import { apiKeys } from '$lib/util/stores';
    import LocalStorage from "$lib/LocalStorage.svelte";
    import "./styles.css"
    

    onMount(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })
</script>



<div id="container">
    <nav>
        <a href="/">Welcome</a>
        {#if $apiKeys.openAI}
        <a href="/chat">Chat</a>
        {/if}
        {#if $apiKeys.kagi}
        <a href="/summarize">Summarize</a>
        {/if}
        <a href="/apikeys">API Keys</a>
    </nav>
    <slot></slot>
</div>
<LocalStorage />