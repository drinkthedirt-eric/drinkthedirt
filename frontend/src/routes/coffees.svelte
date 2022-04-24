<svelte:head>
    <title>Coffees</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core";
    import { query } from "svelte-apollo";
    import sampleImage from "./sample_coffee.png";

    const GET_COFFEES_QUERY = gql`
        query {
            coffees {
                id
                name
                roaster {
                    name
                }
            }
        }
    `;

    const coffees = query(GET_COFFEES_QUERY);
</script>

<h1>Coffees!</h1>
<p>Browse coffee reviews, recipes, and tasting notes.</p>
{#if $coffees.loading}
    <h2>Loading...</h2>
{:else if $coffees.error}
    <p>Error: {$coffees.error.message}</p>
{:else}
    <table class="table table-compact border hover:bg-base-200">
            {#each $coffees.data.coffees as coffee}
                <tr>
                    <a href="coffees/{coffee.id}">
                        <td class="w-20 align-top p-0">
                            <img src={sampleImage} alt={coffee.name} class="m-0"/>
                        </td>
                        <td class="align-top">
                            <div class="font-light">{coffee.roaster.name}</div>
                            <div class="font-thin text-2xl">{coffee.name}</div>
                        </td>
                    </a>
                </tr>
            {/each}
    </table>

{/if}

<!-- Destroying link styling here to make the table a link. -->
<style>
a {
    display:block;
    text-decoration: none;
}
</style>
