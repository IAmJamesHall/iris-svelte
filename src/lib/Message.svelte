<script>
    export let role = "Unknown";
    export let content = "";
    export let id = "";

    import { marked } from "marked";

    let sender = "";
    if (role == "assistant") { sender = "Iris" }
    else if (role == "user") { sender = "You" }
    else if (role == "system") { sender = "System" }
</script>

<div class="message {role}" id={id}>
    <b>{ sender }:</b><br />
    {@html marked.parse(content) }
</div>