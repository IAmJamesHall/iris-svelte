<script>
    import { onMount } from "svelte";
    import { apiKeys } from '$lib/util/stores';
    import LocalStorage from "$lib/LocalStorage.svelte";
    import "./styles.css"
    

    onMount(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })
</script>



<div id="app" class="container">
  <div class="block">
    <h1 class="subtitle is-2">Iris</h1>
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
       <div class="navbar-brand">
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true">Chat</span>
            <span aria-hidden="true">Summarize</span>
            <span aria-hidden="true">API Keys</span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/">
              Welcome
            </a>
      
            {#if $apiKeys.openAI}
            <a class="navbar-item" href="/chat">
              Chat
            </a>
            {/if}
      
            {#if $apiKeys.kagi}
            <a class="navbar-item" href="/summarize">
                Summarize
              </a>
            {/if}
            <a class="navbar-item" href="/apikeys">
                API Keys
            </a>
          </div>
        </div>
      </nav>
    </div>
    <div id="container"><slot></slot></div>

</div>
<LocalStorage />