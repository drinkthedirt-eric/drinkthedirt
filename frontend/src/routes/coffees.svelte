<svelte:head>
    <title>Coffees</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";
    import { getImageUrls } from "$lib/images";

    const GET_COFFEES_QUERY = gql`
        query {
            coffees {
                id
                name
                roaster {
                    name
                }
                photos
            }
        }
    `;

    const coffees = query(GET_COFFEES_QUERY);
</script>

<div class="font-bold text-4xl pb-2">Coffees!</div>
<div>Browse coffee reviews, recipes, and tasting notes.</div>

{#if $coffees.loading}
    <h2>Loading...</h2>
{:else if $coffees.error}
    <p>Error: {$coffees.error.message}</p>
{:else}
    <table class="table table-compact border">
        {#each $coffees.data.coffees as coffee}
            <tr class="hover:bg-base-200">
                <a href="coffees/{coffee.id}" class="table-anchor">
                    <td class="w-60 align-top p-0">
                        <img src={getImageUrls(coffee.photos)[0]} alt={coffee.name} class="m-0"/>
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