<script>
  import { onMount } from "svelte";
  import { apiKeys } from "$lib/util/stores";
  import LocalStorage from "$lib/LocalStorage.svelte";
  import "./styles.css";

  onMount(() => {
    window.scrollTo(0, document.body.scrollHeight);

    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Add a click event on each of them
      navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const targetElements = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          targetElements.classList.toggle("is-active");
        });
      });
    });
  });
</script>

<div id="app" class="container">
  <div class="block">
    <h1 class="subtitle is-2">Iris</h1>
    <nav
      class="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true">Burger 1</span>
          <span aria-hidden="true">Burger 2</span>
          <span aria-hidden="true">Burger 3</span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/"> Welcome </a>

          {#if $apiKeys.openAI}
            <a class="navbar-item" href="/chat"> Chat </a>
          {/if}

          {#if $apiKeys.kagi}
            <a class="navbar-item" href="/summarize"> Summarize </a>
          {/if}
          <a class="navbar-item" href="/apikeys"> API Keys </a>
        </div>
      </div>
    </nav>
  </div>
  <div id="container"><slot /></div>
</div>
<LocalStorage />
