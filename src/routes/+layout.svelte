<script>
    import { onMount } from "svelte";
    import "./styles.css"
    

    onMount(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })
</script>



<div id="container">
    <nav>
        <a href="/chat">Chat</a>
        <a href="/summarize">Summarize</a>
        <a href="/apikeys">API Keys</a>
    </nav>
    <slot></slot>
</div>