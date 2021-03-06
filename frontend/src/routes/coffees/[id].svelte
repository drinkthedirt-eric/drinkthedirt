<script lang="ts">
    import { page } from "$app/stores";
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";;
    import CoffeeProperty from "$lib/coffee_property.svelte";
    import Carousel from "$lib/carousel.svelte";
    import Tabs from "$lib/components/tabs.svelte"
    import { getCategory, getName, getMethod, getStep, getStepName, getGrindSize } from "$lib/string_builder"
    import EmailUsLink from "$lib/links/email_us_link.svelte";

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
                ourReview
                isFavorite
                recipes {
                    method
                    name
                    coffeeWeightGrams
                    waterWeightGrams
                    grind                    
                    grind_odessp
                    waterTempC
                    steps
                }
            }
        }
    `;

    const coffeeResult = query(GET_COFFEE_QUERY, { variables: { where: { id: +$page.params.id }}});

    let pourStepCount = 0;

    function getStepNameWithLabel(recipe: any, name: string): string {
        let totalPours = recipe.steps.reduce((prev, curr) => {
            if (curr.name === "pour") {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0)

        if (pourStepCount == totalPours) {
            pourStepCount = 0;
        }

        if (name === "pour") {
            pourStepCount = pourStepCount + 1;
            return getStepName(name, pourStepCount);            
        }
        return getStepName(name);   
    }

    function goToRecipe() {
        document.getElementById('recipes').scrollIntoView();
    }

    function getRecipeTitles(recipes: any[]): any[] {
        return recipes.map(recipe => {
            return {
                label: getMethod(recipe.method),
                value: recipe.method
            };
        });
    }

    let activeRecipeTab = "V60";
    let showPrepSteps = false;
</script>

{#if $coffeeResult.loading}
    <h2>Loading...</h2>
{:else if $coffeeResult.error}
    <p>Error: {$coffeeResult.error.message}</p>
{:else}
    <div>
        <div class="grid grid-cols-2 gap-4 w-full max-w-7xl md:card-side rounded-none">
            <div class="my-0 col-span-2 md:col-span-1">
                <Carousel carouselId="hello" imageUrls={getImageUrls($coffeeResult.data.coffee.photos)}/>
            </div>
            <div class="mt-2 col-span-2 md:col-span-1 md:mt-0 md:pl-8">
                {#if $coffeeResult.data.coffee.isFavorite}
                    <div class="text-sm font-semibold leading-none text-white bg-indigo-600 p-2 border-round faveBadge mb-2">
                        Drink the Dirt Fave!
                    </div>                
                {/if}
                <div class="text-2xl leading-none">
                    {$coffeeResult.data.coffee.roaster.name}
                </div>
                <div class="text-3xl md:text-4xl font-semibold leading-none">
                    {$coffeeResult.data.coffee.name}
                </div>
                <div class="my-2 text-sm">
                    <span>${$coffeeResult.data.coffee.price.toFixed(2)}</span>
                    <span class="font-extralight">- {getPriceWeightDisplay($coffeeResult.data.coffee)}</span>
                </div>

                <CoffeeProperty type="flavor category">{$coffeeResult.data.coffee.flavorCategories.map(x => getCategory(x)).join(", ")}</CoffeeProperty>
                <div class="flex flex-row gap-x-4">
                    <CoffeeProperty type="sweetness">{$coffeeResult.data.coffee.sweetness}</CoffeeProperty>
                    <CoffeeProperty type="acidity">{$coffeeResult.data.coffee.acidity}</CoffeeProperty>
                    <CoffeeProperty type="body">{$coffeeResult.data.coffee.body}</CoffeeProperty>
                </div>
                <CoffeeProperty type="our review">{$coffeeResult.data.coffee.ourReview}</CoffeeProperty>            
            </div>
        </div>

        <div class="divider"/>

        <div id="recipes" class="w-full text-2xl">recipes</div>
        <div class="mb-4">
            Dig into the why's of each recipe with our in-depth <a class="link link-primary" href="/brewing">recipe guide</a>. We'd love to help you get the most out of this recipe. Email us at <EmailUsLink /> to schedule a troubleshooting session!
        </div>
        <Tabs bind:activeTabValue={activeRecipeTab} items={getRecipeTitles($coffeeResult.data.coffee.recipes)}/>
        {#each $coffeeResult.data.coffee.recipes as recipe}
            {#if recipe.method === activeRecipeTab}
                {#if recipe.method === "V60"}
                    <table class="table table-compact w-1/3 mt-4 mb-0">                        
                        <tr class="border">
                            <td class="font-medium">Coffee Weight</td>
                            <td>{recipe.coffeeWeightGrams}g</td>
                        <tr>
                        <tr class="border">
                            <td class="font-medium">Grind Size</td>
                            <td>
                                {getGrindSize(recipe.grind)} [<a class="link link-primary" href="/brewing#grind">?</a>]
                            </td>
                        <tr>
                        <tr class="border">
                            <td>Fellow Ode + SSP MP burrs</td>
                            <td>{recipe.grind_odessp}</td>
                        <tr class="border">
                            <td class="font-medium">Water Weight</td>
                            <td>{recipe.waterWeightGrams}g</td>
                        <tr>
                        <tr class="border">
                            <td class="font-medium">Water Temperature</td>
                            <td>{recipe.waterTempC}&#176;C / {Math.round(recipe.waterTempC * 1.8 + 32)}&#176;F</td>
                        <tr>
                    </table>
                    <div class="font-semibold mt-4 clickyStepTitle" on:click="{() => showPrepSteps = !showPrepSteps}">
                        Prepare Brewer
                        <span class="font-normal ml-2 {showPrepSteps === false ? '' : 'hidden'}">[+]</span>
                        <span class="font-normal ml-2 {showPrepSteps === true ? '' : 'hidden'}">[-]</span>
                    </div>                    
                    <ol class="{showPrepSteps === true ? '' : 'hidden'}">
                        <li>Set the temperature of your kettle to {recipe.waterTempC}&#176;C / {Math.round(recipe.waterTempC * 1.8 + 32)}&#176;F.</li>
                        <li>Insert filter paper into your V60. Flood your V60 with water and wait for it to drain.</li>
                        <li>Place cup on scale, and V60 on cup.</li>
                        <li>Grind {recipe.coffeeWeightGrams}g of coffee to {getGrindSize(recipe.grind)} [<a class="link link-primary" href="/brewing#grind">?</a>].</li>
                        <li>Add ground coffee to V60, and shake the V60 to flatten out the coffee grounds.</li>
                        <li>Zero out scale.</li>
                    </ol>
                    <div class="font-semibold mt-4">Brew - {getName(recipe.name)}</div>
                    <ol>
                        {#each recipe.steps as step} 
                            <li><span class="font-medium">{getStepNameWithLabel(recipe, step.name)}</span>: {getStep(step.name, step.start_timestamp, step.end_timestamp, step.weight)}</li>
                        {/each}
                    </ol>
                    <div class="mt-4">Drink your coffee! It will taste best after its cooled, at around {60}&#176;C / {Math.round(60 * 1.8 + 32)}&#176;F.</div>
                {/if}
                {#if recipe.method === "Aeropress"}
                <table class="table table-compact w-1/3 mt-4 mb-0">                        
                    <tr class="border">
                        <td class="font-medium">Coffee Weight</td>
                        <td>{recipe.coffeeWeightGrams}g</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Grind Size</td>
                        <td>{getGrindSize(recipe.grind)} [<a class="link link-primary" href="/brewing#grind">?</a>]</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Water Weight</td>
                        <td>{recipe.waterWeightGrams}g</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Water Temperature</td>
                        <td>{recipe.waterTempC}&#176;C / {Math.round(recipe.waterTempC * 1.8 + 32)}&#176;F</td>
                    <tr>
                </table>

                <div class="font-semibold mt-4 clickyStepTitle" on:click="{() => showPrepSteps = !showPrepSteps}">
                    Prepare Brewer
                    <span class="font-normal ml-2 {showPrepSteps === false ? '' : 'hidden'}">[+]</span>
                    <span class="font-normal ml-2 {showPrepSteps === true ? '' : 'hidden'}">[-]</span>
                </div>
                <ol class="{showPrepSteps === true ? '' : 'hidden'}">
                    <li>Set the temperature of your kettle to {recipe.waterTempC}&#176;C / {Math.round(recipe.waterTempC * 1.8 + 32)}&#176;F.</li>
                    <li>Grind {recipe.coffeeWeightGrams}g of coffee to {getGrindSize(recipe.grind)} [<a class="link link-primary" href="/brewing#grind">?</a>].</li>
                    <li>Add ground coffee to Aeropress.</li>
                    <li>Zero out scale.</li>
                </ol>   
                <div class="font-semibold mt-4">Brew - {getName(recipe.name)}</div>
                <ol>
                    <li>Add {recipe.waterWeightGrams}g to Aeropress.</li>
                    <li>Swirl coffee and water.</li>
                    <li>Insert plunger to create a vacuum.</li>
                    <li>Wait 4 minutes.</li>
                    <li>Press gently into a cup.</li>
                </ol>
                <div>Drink your coffee! It will taste best after its cooled, at around {60}&#176;C / {Math.round(60 * 1.8 + 32)}&#176;F.</div>
                {/if}                     
            {/if}        
        {/each}

        <div class="divider"/>

        <div class="w-full text-2xl">from the roaster</div>
        <div class="grid grid-cols-2">
            <div class="col-span-2 sm:col-span-1">
                <CoffeeProperty type="origin">
                    {$coffeeResult.data.coffee.location}, {$coffeeResult.data.coffee.country}
                </CoffeeProperty>
                <CoffeeProperty type="producer">
                    {$coffeeResult.data.coffee.producer}
                </CoffeeProperty>
            </div>
            <div class="col-span-2 sm:col-span-1">
                <CoffeeProperty type="process">{$coffeeResult.data.coffee.process}</CoffeeProperty>
                <CoffeeProperty type="varietal">
                    {$coffeeResult.data.coffee.varietals.join(", ")}
                </CoffeeProperty>
            </div>
        </div>
        <CoffeeProperty type="from the roaster">
            <div>{$coffeeResult.data.coffee.roasterTastingNotes.join(", ")}</div>
            <div class="mt-2">{$coffeeResult.data.coffee.roasterDescription}</div>
        </CoffeeProperty>
    </div>
{/if}

<style>
    .clickyStepTitle {
        cursor: pointer;
    }
    .faveBadge {
        display: inline-block;
        border-radius: 10px;
    }
</style>