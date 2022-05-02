<script lang="ts">
    import { page } from "$app/stores";
    import { gql } from "@apollo/client/core/index.js";
    import { query } from "$lib/svelte-apollo-sad/svelte-apollo";;
    import CoffeeProperty from "../../lib/coffee_property.svelte";
    import Carousel from "../../lib/carousel.svelte";
    import Tabs from "$lib/components/tabs.svelte"
    import { getName, getMethod, getStep, getStepName } from "$lib/recipe_builder"

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
    let recipes = [
        {
            "method": "v60",
            "variables": {
                coffee_weight: 15,
                water_weight: 225,
                water_temperature: 97,
                grind_size: 200
            },
            "name": "2pour",
            "steps": [
                {
                    name: "bloom",
                    weight: 65,
                    start_timestamp: 0,
                    end_timestamp: 10,

                },
                {
                    name: "swirl",
                },
                {
                    name: "pour",
                    weight: 80,
                    start_timestamp: 30,
                    end_timestamp: 40,
                },
                {
                    name: "pour",
                    weight: 80,
                    start_timestamp: 105,
                    end_timestamp: 115,
                },
                {
                    name: "stir",
                },
            ]
        },
        {
            "method": "aeropress",
            "variables": {
                coffee_weight: 12,
                water_weight: 200,
                water_temperature: 97,
                grind_size: 200
            },
            "name": "standard"
        }
    ];

    const recipeStrings = {
        v60 : "V60",
        aeropress: "Aeropress"
    };

    const recipeTitles = recipes.map(recipe => {
        return {
            label: getMethod(recipe.method),
            value: recipe.method
        };
    });

    let activeRecipeTab = "v60";
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
        <div class="w-full text-2xl mb-4">recipes</div>
        <Tabs bind:activeTabValue={activeRecipeTab} items={recipeTitles}/>
        {#each recipes as recipe}
            {#if recipe.method === activeRecipeTab}
                {#if recipe.method === "v60"}
                    <table class="table table-compact w-1/3 mt-4 mb-0">                        
                        <tr class="border">
                            <td class="font-medium">Coffee Weight</td>
                            <td>{recipe.variables?.coffee_weight}g</td>
                        <tr>
                        <tr class="border">
                            <td class="font-medium">Grind Size</td>
                            <td>{recipe.variables?.grind_size} microns</td>
                        <tr>
                        <tr class="border">
                            <td class="font-medium">Water Weight</td>
                            <td>{recipe.variables?.water_weight}g</td>
                        <tr>
                        <tr class="border">
                            <td class="font-medium">Water Temperature</td>
                            <td>{recipe.variables?.water_temperature}&#176;C / {Math.round(recipe.variables?.water_temperature * 1.8 + 32)}&#176;F</td>
                        <tr>
                    </table>
                    <div tabindex="0" class="collapse collapse-arrow px-0 md:w-1/2">
                        <input type="checkbox">
                        <div class="font-semibold collapse-title px-0">Prepare Your Brewer</div>
                        <div class="collapse-content px-0">
                            <ol>
                                <li>Set the temperature of your kettle to {recipe.variables?.water_temperature}&#176;C / {Math.round(recipe.variables?.water_temperature * 1.8 + 32)}&#176;F.</li>
                                <li>Insert filter paper into your V60.</li>
                                <li>Flood V60 and wait for water to drain.</li>
                                <li>Place cup on scale, and V60 on cup.</li>
                                <li>Set your grinder to grind to ${recipe.variables?.grind_size} microns.</li>
                                <li>Grind {recipe.variables?.coffee_weight}g of coffee.</li>
                                <li>Add ground coffee to V60.</li>
                                <li>Shake the V60 to flatten out the coffee grounds, and draw a spiral.</li>
                                <li>Zero out scale.</li>
                            </ol>
                        </div>   
                    </div>
                    <div tabindex="0" class="collapse collapse-arrow py-0 px-0 md:w-1/2">
                        <input type="checkbox" checked>
                        <div class="font-semibold collapse-title px-0">Brew - {getName(recipe.name)}</div>
                        <div class="collapse-content px-0">
                            <ol>
                                {#each recipe.steps as step} 
                                    <li><span class="font-medium">{getStepNameWithLabel(recipe, step.name)}</span>: {getStep(step.name, step.start_timestamp, step.end_timestamp, step.weight)}</li>
                                {/each}
                            </ol>
                        </div>   
                    </div>
                    <div tabindex="0" class="collapse collapse-arrow px-0 md:w-1/2">
                        <input type="checkbox">
                        <div class="font-semibold collapse-title px-0">Cool & Serve</div>
                        <div class="collapse-content px-0">
                            <ol>
                                <li>Wait for all the water to drain.</li>
                                <li>Pour into your drinking cup.</li>
                                <li>Drink when coffee is at {60}&#176;C / {Math.round(60 * 1.8 + 32)}&#176;F.</li>
                            </ol>
                        </div>   
                    </div>
                {/if}
                {#if recipe.method === "aeropress"}
                <table class="table table-compact w-1/3 mt-4 mb-0">                        
                    <tr class="border">
                        <td class="font-medium">Coffee Weight</td>
                        <td>{recipe.variables?.coffee_weight}g</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Grind Size</td>
                        <td>{recipe.variables?.grind_size} microns</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Water Weight</td>
                        <td>{recipe.variables?.water_weight}g</td>
                    <tr>
                    <tr class="border">
                        <td class="font-medium">Water Temperature</td>
                        <td>{recipe.variables?.water_temperature}&#176;C / {Math.round(recipe.variables?.water_temperature * 1.8 + 32)}&#176;F</td>
                    <tr>
                </table>
                <div tabindex="0" class="collapse collapse-arrow px-0 md:w-1/2">
                    <input type="checkbox">
                    <div class="font-semibold collapse-title px-0">Prepare Your Brewer</div>
                    <div class="collapse-content px-0">
                        <ol>
                            <li>Set the temperature of your kettle to {recipe.variables?.water_temperature}&#176;C / {Math.round(recipe.variables?.water_temperature * 1.8 + 32)}&#176;F.</li>
                            <li>Grind {recipe.variables?.coffee_weight}g coffee.</li>
                            <li>Add ground coffee to Aeropress.</li>
                            <li>Zero out scale.</li>
                        </ol>
                    </div>   
                </div>
                <div tabindex="0" class="collapse collapse-arrow py-0 px-0 md:w-1/2">
                    <input type="checkbox" checked>
                    <div class="font-semibold collapse-title px-0">Brew - {getName(recipe.name)}</div>
                    <div class="collapse-content px-0">
                        <ol>
                            <li>Add {recipe.variables?.water_weight}g to Aeropress.</li>
                            <li>Swirl.</li>
                            <li>Gently insert plunger.</li>
                            <li>Wait 4 minutes.</li>
                        </ol>
                    </div>   
                </div>
                <div tabindex="0" class="collapse collapse-arrow px-0 md:w-1/2">
                    <input type="checkbox">
                    <div class="font-semibold collapse-title px-0">Cool & Serve</div>
                    <div class="collapse-content px-0">
                        <ol>
                            <li>Wait for all the water to drain.</li>
                            <li>Pour into your drinking cup.</li>
                            <li>Drink when coffee is at {60}&#176;C / {Math.round(60 * 1.8 + 32)}&#176;F.</li>
                        </ol>
                    </div>   
                </div>
                {/if}                     
            {/if}        
        {/each}
    </div>
{/if}

<style>
</style>