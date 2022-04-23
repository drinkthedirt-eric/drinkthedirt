<svelte:head>
    <title>Coffees</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core";
    import { query } from "svelte-apollo";

    const GET_COFFEES_QUERY = gql`
        query {
            coffees {
            id
            name
            }
        }
    `;

    const coffees = query(GET_COFFEES_QUERY);
</script>

<h1>Coffees!</h1>

{#if $coffees.loading}
    Loading...
{:else if $coffees.error}
    Error: {$coffees.error.message}
{:else}
    <ul>
        {#each $coffees.data.coffees as coffee}
            <li>{coffee.name}</li>
        {/each}
    </ul>
{/if}


