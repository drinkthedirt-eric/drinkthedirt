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
                isFavorite
            }
        }
    `;

    const coffees = query(GET_COFFEES_QUERY);
</script>

<div class="font-bold text-4xl pb-2">DRINK THE DIRT</div>
<div>Find your next favorite coffee and brew it perfectly. We recommend a highly curated selection from the best direct-trade roasters, and create recipes for each coffee.</div>
<br/>

<div>Email us at <EmailUsLink /> to schedule a FREE Zoom workshop or suggest coffees for dial-in. Follow us on <DiscordLink /> and <InstagramLink/> for new recommendations!</div>


<div class="divider" />
<div class="font-bold text-2xl">Recent Recommendations</div>
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
                <div class="flex border">
                    <div class="indicator">
                        {#if coffee.isFavorite}
                            <span class="indicator-item indicator-middle badge badge-secondary bg-transparent border-0">
                                <svg class="heart" viewBox="0 0 32 29.6">
                                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                                </svg> 
                            </span> 
                        {/if}
                        <div class="flex flex-row-reverse justify-end md:justify-start md:flex-row">
                            <img src={getImageUrls(coffee.photos)[0]} alt={coffee.name} class="m-0 w-24 md:w-48 object-cover"/>
                            <div class="flex flex-col m-2 flex-grow">
                                <div class="font-normal">{coffee.roaster.name}</div>
                                <div class="font-semibold text-2xl">{coffee.name}</div>
                                <div class="mt-2 font-light">
                                    {coffee.country} - {coffee.location}
                                </div>
    
                                <div class="mt-2">
                                    <div class="font-thin">${coffee.price.toFixed(2)} - {getPriceWeightDisplay(coffee)}</div>
                                </div>
    
                                <div class="grid grid-cols-4 gap-x-4 font-thin mt-2">
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
                    </div>                        
                </div>
            </a>
        </div>
    {/each}
</div>
{/if}

<style>
    .heart {
        fill: #2563eb;
        width: 50px;
        top: 5px;
        margin-right: 100px;
    }
</style>