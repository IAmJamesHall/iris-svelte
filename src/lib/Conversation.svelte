<script>
    import Message from "./Message.svelte";
    /**
     * @type {any[]}
     */
     export let conversation = [];
</script>

<div id="conversation">
    {#each conversation as { id, role, content }}
        <Message id={id} role={role} content={content} />
    {/each}
</div>