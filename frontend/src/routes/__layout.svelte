<svelte:head>
</svelte:head>

<script lang="ts">
    import "$lib/global.css";
    import { ApolloClient, InMemoryCache } from "@apollo/client/core";
    import { setClient } from "svelte-apollo";

    // Global setup
    // TODO this brings in some weird react dependencies. Use @apollo/client/core for now.
    const apolloClient = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache()
    });
    setClient(apolloClient);
</script>

<div class="navbar bg-base-100">
    <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Home</a></li>
            <li><a href="/coffees">Coffees</a></li>
            <li><a href="/brewing">Brewing</a></li>
            <li><a href="/classes">Tastings & Classes</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/about">About</a></li>
        </ul>
      </div>
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">DRINK THE DIRT</a>
    </div>
    <div class="hidden lg:flex navbar-center">
        <ul class="menu menu-horizontal p-0">
            <li><a href="/">Home</a></li>
            <li><a href="/coffees">Coffees</a></li>
            <li><a href="/brewing">Brewing</a></li>
            <li><a href="/classes">Tastings & Classes</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </div>
</div>

<div class="prose">
    <slot></slot>
</div>