<script lang="ts">
  const roaster = {
    name: "Onda Origins",
    link: "https://ondaorigins.com/",
  };
  const coffee = {
    name: "Umoja / Congo",
    roaster: roaster,
    country: "Democratic Republic of Congo",
    location: "Kalehe Territory, South Kivu Province",
    producer: "Solidarité Pour La Promotion des Actions Café et le Développement Intégral",
    process: "Washed",
    varietals: ["SL-34"],
    roasterTastingNotes: ["kumquat", "white pepper", "cantaloupe"],
    roasterDescription: "This certified fairtrade and organic cooperative provides stability for its members, for whom coffee is a key source of income and helps promote their rights.",
    flavorCategories: ["Fruity"],
    sweetness: "High",
    body: "Medium",
    acidity: "Low",
    ourTastingNotes: ["honeydew", "honey", "orange"],
  };
</script>

<div class="flex justify-center">
  <div class="card w-full max-w-7xl bg-base-200 px-4 py-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-1">
        <div class="text-xl font-light leading-none">{coffee.roaster.name}</div>
        <div class="text-4xl font-thin leading-none">{coffee.name}</div>
        <div class="mt-2 text-sm">
          <span>$18.00</span>
          <span class="font-extralight">- 12 oz / 340 g</span>
        </div>
      </div>
      <div class="col-span-2">
        <div class="pb-2">
          <div class="font-semibold">origin</div>
          <div>{coffee.location}, {coffee.country}</div>
        </div>
        <div class="pb-2">
          <div class="font-semibold">producer</div>
          <div>{coffee.producer}</div>
        </div>
        <div class="pb-2">
          <div class="font-semibold">process</div>
          <div>{coffee.process}</div>
        </div>
        <div class="pb-2">
          <div class="font-semibold">varietal</div>
          <div>{coffee.varietals.join(", ")}</div>
        </div>
        <div class="pb-2">
          <div class="font-semibold">from the roaster</div>
          <div>{coffee.roasterTastingNotes.join(", ")}</div>
          <div class="mt-2">{coffee.roasterDescription}</div>
        </div>
      </div>
    </div>
  </div>
</div>