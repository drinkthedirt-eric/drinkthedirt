<svelte:head>
</svelte:head>

<!-- Required Core Stylesheet -->
<link rel="stylesheet" href="../node_modules/@glidejs/glide/dist/css/glide.core.min.css">
<!-- Optional Theme Stylesheet -->
<link rel="stylesheet" href="../node_modules/@glidejs/glide/dist/css/glide.theme.min.css">

<script lang="ts">
    import "$lib/global.css";
    import { ApolloClient, InMemoryCache } from "@apollo/client/core/index.js";
    import { setClient } from "$lib/svelte-apollo-sad/svelte-apollo";
    import { dev } from '$app/env';

    const endpoints = {
        dev: "http://localhost:4000/graphql",
        prod: "https://2fvpqj4xmb.execute-api.us-west-2.amazonaws.com/graphql"
    }

    let endpoint = endpoints.dev;

    if (!dev) {
        endpoint = endpoints.prod
    }
        

    // Global setup
    const apolloClient = new ApolloClient({
        uri: endpoint,
        cache: new InMemoryCache()
    });
    setClient(apolloClient);
</script>

<div class="navbar bg-base-200">
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
        </ul>
    </div>
</div>

<div class="container px-8 py-4 w-full max-w-7xl prose font-light leading-tight">
    <slot></slot>
</div>