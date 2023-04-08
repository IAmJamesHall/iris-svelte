<script>
    import { usage } from '$lib/util/stores';

    export let api = "openAI";

    // @ts-ignore
    console.log(api);
    const apiStats = $usage[api]
    console.log($usage);
</script>
{#if api == "openAI" || api == "kagi"}
<div id="usage">Tokens: {apiStats.tokens}. Cost: ${Number(apiStats.cost).toFixed(6)}</div>
{:else}
<div id="usage">Invalid API type</div>
{/if}