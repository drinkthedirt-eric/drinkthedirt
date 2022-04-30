<svelte:head>
    <title>Home</title>
</svelte:head>

<script lang="ts">
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";;
    import sampleImage from "./sample_coffee.png";
    import DiscordLink from "$lib/links/discord_link.svelte";
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import InstagramLink from "$lib/links/instagram_link.svelte";

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

<div class="flex flex-col">
    <div class="font-bold text-4xl pb-2">DRINK THE DIRT</div>
    <div>Find your next favorite coffee and brew it perfectly with our catalog of specialty coffee reviews and recipes. We review and dial-in every coffee for every setup to help you get the most out of your brew.</div>
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
        <table class="table table-compact border hover:bg-base-200">
                {#each $coffees.data.coffees as coffee}
                    <tr>
                        <a href="coffees/{coffee.id}" class="table-anchor">
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
</div>