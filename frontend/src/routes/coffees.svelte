<svelte:head>
    <title>Coffees</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";
    import { getImageUrls } from "$lib/images";
    import { getCategory, getPriceWeightDisplay } from "$lib/string_builder";
    import CoffeePropertyCard from "$lib/coffee_property_card.svelte"

    const GET_COFFEES_QUERY = gql`
        query {
            coffees(orderBy: {createdAt: desc}) {
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
                createdAt
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
    <div class="mt-4">
        {#each $coffees.data.coffees as coffee}
        <div class="hover:bg-base-200">
            <a href="coffees/{coffee.id}" class="table-anchor">
                <div class="flex flex-row-reverse border md:flex-row">
                    <img src={getImageUrls(coffee.photos)[0]} alt={coffee.name} class="m-0 w-48 object-cover wtf min-w-0"/>
                    <div class="flex flex-col m-2">
                        <div class="font-normal">{coffee.roaster.name}</div>
                        <div class="font-semibold text-2xl">{coffee.name}</div>
                        <div class="mt-2 font-light">
                            {coffee.country} - {coffee.location}
                        </div>

                        <div class="mt-2">
                            <div class="font-thin">${coffee.price.toFixed(2)} - {getPriceWeightDisplay(coffee)}</div>
                        </div>

                        <div class="grid grid-cols-4 gap-x-4 gap-y-2 font-thin mt-2">
                            <div class="col-span-4 md:col-span-1">
                                <CoffeePropertyCard type="flavor category">{coffee.flavorCategories.map(x => getCategory(x)).join(", ")}</CoffeePropertyCard>
                            </div>
                            <div class="flex flex-row gap-x-4">
                                <CoffeePropertyCard type="sweetness">{coffee.sweetness}</CoffeePropertyCard>
                                <CoffeePropertyCard type="body">{coffee.body}</CoffeePropertyCard>
                                <CoffeePropertyCard type="acidity">{coffee.acidity}</CoffeePropertyCard>
                            </div>
    
                        </div>                            
                    </div>
                </div>
            </a>
        </div>
        {/each}
    </div>
{/if}

<style>
    /* .wtf {
        min-width: 20em;
    } */
</style>