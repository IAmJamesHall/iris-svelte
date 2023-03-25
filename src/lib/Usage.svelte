<script>
    import { usage } from './stores';
</script>

<div id="usage">Tokens: {$usage.tokens}. Cost: ${Number($usage.cost).toFixed(6)}</div>