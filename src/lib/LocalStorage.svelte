<script>
    import { onMount } from "svelte";
    import { conversations, apiKeys, usage, settings, defaultValues } from "$lib/util/stores";

    

    onMount(() => {
        console.log('mounting <LocalStorage>')
        // localStorage.setItem("conversations", "hello there");
        //SETTINGS
        settings.set(
            JSON.parse(localStorage.getItem("settings")) || defaultValues.settings
        );
        settings.subscribe((settings) => {
            localStorage.setItem("settings", JSON.stringify(settings));
        });


        //CONVERSATIONS
        conversations.set(JSON.parse(localStorage.getItem('conversations')) || defaultValues.conversations);
        conversations.subscribe((conversations) => {
            localStorage.setItem("conversations", JSON.stringify(conversations));
        })

        //USAGE
        usage.set(JSON.parse(localStorage.getItem('usage')) || defaultValues.usage);
        usage.subscribe(usage => {
            localStorage.setItem('usage', JSON.stringify(usage));
        })

        //API KEYS
        apiKeys.set(JSON.parse(localStorage.getItem('apiKeys')) || defaultValues.apiKeys);
        apiKeys.subscribe(apiKeys => {
            localStorage.setItem('apiKeys', JSON.stringify(apiKeys))
        })
    });
</script>
