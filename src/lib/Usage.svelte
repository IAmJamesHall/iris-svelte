<script>
    import { usage } from '$lib/util/stores';

</script>

<div id="usage">Tokens: {$usage.tokens}. Cost: ${Number($usage.cost).toFixed(6)}</div>
