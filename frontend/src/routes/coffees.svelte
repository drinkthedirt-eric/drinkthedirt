<svelte:head>
    <title>Coffees</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";
    import { getImageUrls } from "$lib/images";
    import { getCategory, getPriceWeightDisplay } from "$lib/string_builder";
    import CoffeeProperty from "$lib/coffee_property.svelte"

    const GET_COFFEES_QUERY = gql`
        query {
            coffees {
                id
                name
                roaster {
                    name
                }
                photos
                country
                location
                price
                priceTargetWeightGrams
                flavorCategories
                sweetness
                body
                acidity
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
            <tr class="hover:bg-base-200 border">
                <a href="coffees/{coffee.id}" class="table-anchor">
                    <td class="w-40 align-top p-0 md:w-60">
                        <img src={getImageUrls(coffee.photos)[0]} alt={coffee.name} class="m-0 min-w-full"/>
                    </td>
                    <td class="align-top">
                        <div class="font-light">{coffee.roaster.name}</div>
                        <div class="font-thin text-2xl">{coffee.name}</div>
                        <div class="mt-2 font-normal">
                            {coffee.country} - {coffee.location}
                        </div>

                        <div class="mt-2">
                            <div class="font-thin">${coffee.price.toFixed(2)} - {getPriceWeightDisplay(coffee)}</div>
                        </div>

                        <div class="grid grid-cols-4 gap-x-4 gap-y-2 font-thin mt-2">
                            <div class="col-span-4 md:col-span-1">
                                <CoffeeProperty type="flavor category">{coffee.flavorCategories.map(x => getCategory(x)).join(", ")}</CoffeeProperty>
                            </div>
                            <div class="flex flex-row gap-x-4">
                                <CoffeeProperty type="sweetness">{coffee.sweetness}</CoffeeProperty>
                                <CoffeeProperty type="body">{coffee.body}</CoffeeProperty>
                                <CoffeeProperty type="acidity">{coffee.acidity}</CoffeeProperty>
                            </div>
 
                        </div>
                    </td>
                </a>
            </tr>
        {/each}
    </table>
{/if}

<!-- <div class="col-span-2 md:col-span-1"></div> -->