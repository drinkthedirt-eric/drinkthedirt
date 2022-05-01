<script lang="ts">
    import { page } from "$app/stores";
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";;
    import CoffeeProperty from "../../lib/coffee_property.svelte";
    import Carousel from "../../lib/carousel.svelte";
    import sampleRecipeImage from "../sample_recipe.png";
    import sampleRecipeImage2 from "../sample_recipe_2.png";

    const getPriceWeightDisplay = (coffee: any): string => {
        const ounces: number = Math.ceil(coffee.priceTargetWeightGrams*0.035274);
        return `${ounces} oz / ${coffee.priceTargetWeightGrams} g`;
    }

    const getImageUrls = (imagePaths: string[]): string[] => {
        return imagePaths.map(imagePath => getImageUrl(imagePath));
    }

    const getImageUrl = (imagePath: string): string => {
        return `https://ik.imagekit.io/drinkthedirt/${imagePath}`;
    };

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

    const singleColBP = "md";
</script>
{#if $coffeeResult.loading}
    <h2>Loading...</h2>
{:else if $coffeeResult.error}
    <p>Error: {$coffeeResult.error.message}</p>
{:else}
    <div class="justify-center">
        <div class="grid grid-cols-2 gap-4 w-full max-w-7xl {singleColBP}:card-side rounded-none">
            <div class="my-0 col-span-2 {singleColBP}:col-span-1">
                <Carousel carouselId="hello" imageUrls={getImageUrls($coffeeResult.data.coffee.photos)}/>
            </div>
            <div class="mt-3 col-span-2 {singleColBP}:col-span-1 {singleColBP}:mt-0 {singleColBP}:pl-8">
                <div class="text-2xl leading-none">
                    {$coffeeResult.data.coffee.roaster.name}
                </div>
                <div class="text-3xl {singleColBP}:text-4xl font-thin leading-none">
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
        <div class="w-full text-2xl">from drink the dirt</div>
        <div class="grid grid-cols-4 gap-1 mt-4">
            <div class="col-span-4 {singleColBP}:col-span-3">
                <CoffeeProperty type="our review">{$coffeeResult.data.coffee.roasterDescription}</CoffeeProperty>            
                <CoffeeProperty type="our impressions">{$coffeeResult.data.coffee.ourTastingNotes.join(", ")}</CoffeeProperty>
            </div>
            <div class="col-span-4 {singleColBP}:col-span-1 {singleColBP}:order-first grow-0">
                <div class="grid grid-cols-2">
                    <div class="col-span-1 {singleColBP}:col-span-2">
                        <CoffeeProperty type="flavor category">{$coffeeResult.data.coffee.flavorCategories.join(", ")}</CoffeeProperty>
                        <CoffeeProperty type="sweetness">{$coffeeResult.data.coffee.sweetness}</CoffeeProperty>
                    </div>
                    <div class="col-span-1 {singleColBP}:col-span-2">
                        <CoffeeProperty type="body">{$coffeeResult.data.coffee.body}</CoffeeProperty>
                        <CoffeeProperty type="acidity">{$coffeeResult.data.coffee.acidity}</CoffeeProperty>
                    </div>
                </div>    
            </div>
        </div>
        <div class="divider"/>
        <div class="mt-4 grid grid-cols-3 gap-4">
            <div class="col-span-3 lg:col-span-1">
                <img src={sampleRecipeImage} alt={$coffeeResult.data.coffee.name} class="m-0 h-96 {singleColBP}:h-fit"/>
            </div>
            <div class="col-span-3 lg:col-span-1">
                <img src={sampleRecipeImage2} alt={$coffeeResult.data.coffee.name} class="m-0 h-96 {singleColBP}:h-fit"/>
            </div>
        </div>
    </div>
{/if}