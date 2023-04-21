<script>
    export let role = "Unknown";
    export let content = "";
    export let id = "";

    import { marked } from "marked";

    let sender = "";
    if (role == "assistant") {
        sender = "Iris";
    } else if (role == "user") {
        sender = "You";
    } else if (role == "system") {
        sender = "System";
    }
</script>

<!-- <div class="message {role}" {id}>
    <b>{sender}:</b><br />
    {@html marked.parse(content)}
</div> -->

<div class="card message {role}" {id}>
    <div class="card-content">
        <div class="content">
            <b>{sender}:</b><br />
            {@html marked.parse(content)}
        </div>
    </div>
</div>
