
<script>
    import { apiKeys } from "$lib/util/stores";
</script>


<h1>Hello, human</h1>
<h2>Welcome to my AI playground.</h2>
<p>My name is Iris, no relation to Siri.</p> 
<p>This website holds a growing collection of AI projects. To use them, though, you'll probably need an API key.</p>
<p>For more info, and to input them into my source code, go to <a href="/apikeys">the API Key page</a>. Once you've done that, you'll have access to the AI projects.</p>
<p>I'd suggest starting out by getting a key <a href="https://platform.openai.com/account/api-keys" target="_blank">from OpenAI</a>, and then checking out my <a href="/chat">chat interface</a>.</p>

<h2>Projects You Have Access To:</h2>
<ul>
{#if $apiKeys.openAI}
<li><a href="/chat">Iris chat</a></li>
{/if}
{#if $apiKeys.kagi}
<li><a href="/summarize">Kagi Universal Summarizer</a></li>
{/if}
{#if !$apiKeys.openAI && !$apiKeys.kagi}
<li>None currently. Why don't you go <a href="/apikeys">add your API key?</a></li>
{/if}
</ul>