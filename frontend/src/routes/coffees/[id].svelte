<script lang="ts">
  const roaster = {
    name: "Onda Origins",
    link: "https://ondaorigins.com/",
  };
  const coffee = {
    name: "Umoja",
    roaster: roaster,
    country: "Democratic Republic of Congo",
    location: "Kalehe Territory, South Kivu Province",
    producer: "Solidarité Pour La Promotion des Actions Café et le Développement Intégral",
    varietals: ["SL-34"],
    process: "Washed",
    roasterTastingNotes: ["kumquat", "white pepper", "cantaloupe"],
    flavorCategories: ["Fruity"],
    sweetness: "High",
    body: "Medium",
    acidity: "Low",
    ourTastingNotes: ["honeydew", "honey", "orange"],
  };
</script>

<div class="flex justify-center">
  <div class="card max-w-7xl">
    <p>{coffee.name}</p>
  </div>
</div>