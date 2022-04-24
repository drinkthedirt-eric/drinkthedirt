<script lang="ts">
    import CoffeeProperty from "../../lib/coffee_property.svelte";
    import sampleImage from "../sample_coffee.png";
    import sampleImage2 from "../sample_coffee_2.png";
    import sampleImage3 from "../sample_coffee_3.png";

    const roaster = {
        name: "Onda Origins",
        link: "https://ondaorigins.com/",
    };
    const coffee = {
        name: "Umoja / Congo",
        roaster: roaster,
        country: "Democratic Republic of Congo",
        location: "Kalehe Territory, South Kivu Province",
        producer:
            "Solidarité Pour La Promotion des Actions Café et le Développement Intégral",
        process: "Washed",
        varietals: ["SL-34"],
        roasterTastingNotes: ["kumquat", "white pepper", "cantaloupe"],
        roasterDescription:
            "This certified fairtrade and organic cooperative provides stability for its members, for whom coffee is a key source of income and helps promote their rights.",
        flavorCategories: ["Fruity"],
        sweetness: "High",
        body: "Medium",
        acidity: "Low",
        ourTastingNotes: ["honeydew", "honey", "orange"],
    };
</script>

<div class="flex justify-center">
    <div class="card card-compact lg:card-normal w-full max-w-7xl sm:card-side rounded-none">
        <figure class="my-0">
            <img src={sampleImage2} alt={coffee.name} class="m-0 h-96 sm:h-fit"/>
        </figure>
        <div class="mt-3 sm:mt-0 sm:pl-8">
            <div class="text-xl font-light leading-none">
                {coffee.roaster.name}
            </div>
            <div class="text-3xl sm:text-4xl font-thin leading-none">
                {coffee.name}
            </div>
            <div class="mt-2 text-sm">
                <span>$18.00</span>
                <span class="font-extralight">- 12 oz / 340 g</span>
            </div>
            <div class="col-span-3 lg:col-span-2">
                <CoffeeProperty type="origin"
                    >{coffee.location}, {coffee.country}</CoffeeProperty
                >
                <CoffeeProperty type="producer"
                    >{coffee.producer}</CoffeeProperty
                >
                <CoffeeProperty type="process">{coffee.process}</CoffeeProperty>
                <CoffeeProperty type="varietal"
                    >{coffee.varietals.join(", ")}</CoffeeProperty
                >
                <CoffeeProperty type="from the roaster">
                    <div>{coffee.roasterTastingNotes.join(", ")}</div>
                    <div class="mt-2">{coffee.roasterDescription}</div>
                </CoffeeProperty>
            </div>
        </div>
    </div>
</div>
