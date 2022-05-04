<svelte:head>
    <title>Home</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";;
    import DiscordLink from "$lib/links/discord_link.svelte";
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import InstagramLink from "$lib/links/instagram_link.svelte";
    import { getImageUrls } from "$lib/images";
    import { getCategory, getPriceWeightDisplay } from "$lib/string_builder";
    import CoffeePropertyCard from "$lib/coffee_property_card.svelte"

    const GET_COFFEES_QUERY = gql`
        query {
            coffees(orderBy: {createdAt: desc}, take: 10) {
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

<div class="flex flex-col">
    <div class="font-bold text-4xl pb-2">DRINK THE DIRT</div>
    <div>Find your next favorite coffee and brew it perfectly with our catalog of specialty coffee reviews and recipes. We review and create individual recipes for every coffee to help you get the most out of your brew.</div>
    <br/>
    <div>We're very new. Join our <DiscordLink /> community or drop us a note at <EmailUsLink /> to talk coffee, debug your brew, or give us feedback. Follow us on <InstagramLink/> for updates!</div>
    <div class="divider" />
    <div class="font-bold text-2xl">Recent Reviews and Recipes</div>
    <a class="link link-primary" href="/coffees">See all the coffees!</a>
    {#if $coffees.loading}
        <p>Loading...</p>
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
                        <div class="grid grid-cols-4 gap-x-4 gap-y-2 font-thin mt-2">
                            <div class="col-span-4 md:col-span-1">
                                <CoffeePropertyCard type="flavor category">{coffee.flavorCategories.map(x => getCategory(x)).join(", ")}</CoffeePropertyCard>
                            </div>    
                        </div>                            
                    </div>
                </div>
            </a>
        </div>
        {/each}
    </div>
    {/if}
</div>
