<script lang="ts">
    import { page } from "$app/stores";
    import { gql } from "@apollo/client/core";
    import { query } from "svelte-apollo";
    import CoffeeProperty from "../../lib/coffee_property.svelte";
    import sampleImage2 from "../sample_coffee_2.png";
    import sampleRecipeImage from "../sample_recipe.png";
    import sampleRecipeImage2 from "../sample_recipe_2.png";

    const getPriceWeightDisplay = (coffee: any): string => {
        const ounces: number = Math.ceil(coffee.priceTargetWeightGrams*0.035274);
        return `${ounces} oz / ${coffee.priceTargetWeightGrams} g`;
    }

    const GET_COFFEE_QUERY = gql`
        query Coffee($where: CoffeeWhereUniqueInput!) {
            coffee(where: $where) {
                id
                createdAt
                name
                photos
                roaster {
                    name
                    link
                    logoPhoto
                }
                country
                location
                elevationStart
                elevationEnd
                producer
                varietals
                process
                roasterTastingNotes
                roasterDescription
                price
                priceTargetWeightGrams
                flavorCategories
                sweetness
                body
                acidity
                ourTastingNotes
            }
        }
    `;

    const coffeeResult = query(GET_COFFEE_QUERY, { variables: { where: { id: +$page.params.id }}});
</script>
{#if $coffeeResult.loading}
    <h2>Loading...</h2>
{:else if $coffeeResult.error}
    <p>Error: {$coffeeResult.error.message}</p>
{:else}
    <div class="justify-center">
        <div class="card w-full max-w-7xl lg:card-side rounded-none">
            <figure class="my-0 lg:w-1/2">
                <img src={sampleImage2} alt={$coffeeResult.data.coffee.name} class="m-0 h-96 lg:h-fit"/>
            </figure>
            <div class="mt-3 lg:mt-0 lg:pl-8 lg:w-1/2">
                <div class="text-xl font-light leading-none">
                    {$coffeeResult.data.coffee.roaster.name}
                </div>
                <div class="text-3xl lg:text-4xl font-thin leading-none">
                    {$coffeeResult.data.coffee.name}
                </div>
                <div class="my-2 text-sm">
                    <span>${$coffeeResult.data.coffee.price.toFixed(2)}</span>
                    <span class="font-extralight">- {getPriceWeightDisplay($coffeeResult.data.coffee)}</span>
                </div>
                <CoffeeProperty type="origin"
                    >{$coffeeResult.data.coffee.location}, {$coffeeResult.data.coffee.country}</CoffeeProperty
                >
                <CoffeeProperty type="producer"
                    >{$coffeeResult.data.coffee.producer}</CoffeeProperty
                >
                <CoffeeProperty type="process">{$coffeeResult.data.coffee.process}</CoffeeProperty>
                <CoffeeProperty type="varietal"
                    >{$coffeeResult.data.coffee.varietals.join(", ")}</CoffeeProperty
                >
                <CoffeeProperty type="from the roaster">
                    <div>{$coffeeResult.data.coffee.roasterTastingNotes.join(", ")}</div>
                    <div class="mt-2">{$coffeeResult.data.coffee.roasterDescription}</div>
                </CoffeeProperty>
            </div>
        </div>
        <div class="divider"/>
        <div class="text-center w-full font-semibold">from drink the dirt</div>
        <div class="mt-4 grid grid-cols-3 gap-4">
            <div class="col-span-3 lg:col-span-1 gap-4 lg:text-right mr-6">
                <div class="mb-2">{$coffeeResult.data.coffee.roasterDescription}</div>
                <div class="grid grid-cols-2">
                    <div class="col-span-1">
                        <CoffeeProperty type="flavor category">{$coffeeResult.data.coffee.flavorCategories.join(", ")}</CoffeeProperty>
                        <CoffeeProperty type="our tasting notes">{$coffeeResult.data.coffee.ourTastingNotes.join(", ")}</CoffeeProperty>
                    </div>
                    <div class="col-span-1">
                        <CoffeeProperty type="sweetness">{$coffeeResult.data.coffee.sweetness}</CoffeeProperty>
                        <CoffeeProperty type="body">{$coffeeResult.data.coffee.body}</CoffeeProperty>
                        <CoffeeProperty type="acidity">{$coffeeResult.data.coffee.acidity}</CoffeeProperty>
                    </div>
            </div>
            </div>
            <div class="col-span-3 lg:col-span-1">
                <img src={sampleRecipeImage} alt={$coffeeResult.data.coffee.name} class="m-0 h-96 sm:h-fit"/>
            </div>
            <div class="col-span-3 lg:col-span-1">
                <img src={sampleRecipeImage2} alt={$coffeeResult.data.coffee.name} class="m-0 h-96 sm:h-fit"/>
            </div>
        </div>
    </div>
{/if}