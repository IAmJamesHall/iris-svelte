<script>
    import { onMount } from "svelte";
    import { conversation, openAIKey, usage, settings, defaultValues } from "$lib/stores";

    

    onMount(() => {
        //SETTINGS
        settings.set(
            JSON.parse(localStorage.getItem("settings")) || defaultValues.settings
        );
        settings.subscribe((settings) => {
            localStorage.setItem("settings", JSON.stringify(settings));
        });


        //CONVERSATION
        conversation.set(JSON.parse(localStorage.getItem('conversation')) || defaultValues.conversation);
        conversation.subscribe((conversation) => {
            localStorage.setItem("conversation", JSON.stringify(conversation));
        })

        //USAGE
        usage.set(JSON.parse(localStorage.getItem('usage')) || defaultValues.usage);
        usage.subscribe(usage => {
            localStorage.setItem('usage', JSON.stringify(usage));
        })

        //OPENAI KEY
        openAIKey.set(localStorage.getItem('openAIKey') || "");
        openAIKey.subscribe(openAIKey => {
            localStorage.setItem('openAIKey', openAIKey)
        })
    });
</script>
