<script>
    export let role = "Unknown";
    export let content = "";
    export let id = "";

    
    let sender = "";
    if (role == "assistant") { sender = "Iris" }
    else if (role == "user") { sender = "You" }
    else if (role == "system") { sender = "System" }
</script>

<p class="message {role}" id={id}>
    <b>{ sender }:</b> 
    { content }
</p>