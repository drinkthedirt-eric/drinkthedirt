<svelte:head>
    <title>Brewing</title>
</svelte:head>

<script lang="ts">
import EmailUsLink from "$lib/links/email_us_link.svelte";

</script>

<div class="font-bold text-4xl pb-2">Understanding Our Recipes</div>
<div>It’s simple enough to pour hot water through ground coffee and a paper filter, but getting the best flavor out of your brews can quickly get complicated. Read on to get all the details on making great filter coffee.</div>
<br>
<div class="font-medium text-2xl pb-2">Coffee Extraction</div>
<div class="pb-2">In coffee brewing, extraction refers to the flavors and compounds we pull out from coffee grounds into the resulting coffee drink. In general, there’s a sweet spot in extraction that balances acidity and sweetness while minimizing bitterness.</div>
<div>Coffees that are under-extracted will taste acidic to the point of sourness, or weak and diluted. Over extracted coffees will taste astringent or bitter. Over-extracted coffees can also taste flat, without any tasting notes. Below you can read about the variables that impact extraction, and how to adjust them to make your perfect cup.</div>
<br>
<div class="font-medium text-2xl pb-2">Extraction Variables</div>
<div class="text-xl pb-1 underline">Temperature</div>
<div class="pb-2">Usually, between 93C and 99C. Hotter water increases extraction, we recommend brewing at 97C and changing other variables first.</div>
<div id="grind" class="text-xl pb-1 underline">Grind Size</div>
<div class="pb-2">Grinding finer will increase extraction, and grinding courser will decrease extraction. We define our own grind sizes specifically for filter coffee, which are mapped to settings for specific grinders below. Let us know at <EmailUsLink/> if you'd like to see a grinder on here.</div>
<table class="table-compact border">
    <thead>
        <tr>
            <th>Grind Size</th>
            <th>Looks Like</th>
            <th>Ode + SSP</th>
        </tr>
    </thead>
    <tr>
        <td class="border" rowspan="3">Very Fine</td>
        <td class="border" rowspan="3">Sugar</td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
    <tr>
        <td class="border" rowspan="3">Fine</td>
        <td class="border" rowspan="3">Sugar</td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
    <tr>
        <td class="border" rowspan="3">Medium Fine</td>
        <td class="border" rowspan="3">Table Salt</td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
    <tr>
        <td class="border" rowspan="3">Medium</td>
        <td class="border" rowspan="3"></td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
    <tr>
        <td class="border" rowspan="3">Coarse Medium</td>
        <td class="border" rowspan="3"></td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
    <tr>
        <td class="border" rowspan="3">Coarse</td>
        <td class="border" rowspan="3">Kosher Salt</td>
        <td class="border">3.0</td>
    <tr>
        <td class="border">3.1</td>
    </tr>    
    <tr>
        <td class="border">3.2</td>
    </tr>
</table>
<div class="text-xl pb-1 underline">Coffee: Water Ratio</div>
<div class="pb-2">Usually we brew between 1:13 and 1:17. This ratio refers to the amount of water you add to ground coffee. A ratio of 1:16 means using 16g for every 1g of coffee in your brew. Longer ratios will increase extraction but we might percieve as weaker due to dilution.</div>
<div class="text-xl pb-1 underline">Agitation</div>
<div class="pb-2">We agitate the coffee bed with stirring and pouring. We like to adjust our pouring technique instead of adjusting our stirring. Extraction will increase with higher pouring and more frequent pours.</div>
<br>

<div class="font-bold text-4xl pb-2">Troubleshooting Your Brew</div>
<div class="pb-2">If your brew tastes:</div>
<div class="text-xl pb-1 underline">Bitter / Astringent</div>
<div class="pb-2">
    <div>The brew is over-extracted. Try:</div>
    <ul>
        <li>Grind courser</li>
        <li>Reduce agitation</li>
        <li>Lower the water temperature</li>
    </ul>
</div>
<div class="text-xl pb-1 underline">Sour</div>
<div class="pb-2">
    <div>The brew is under-extracted. Try:</div>
    <ul>
        <li>Grind finder</li>
        <li>Increase agitation</li>
        <li>Increase the water temperature</li>
    </ul>
</div>
<div class="text-xl pb-1 underline">Sour & Bitter</div>
<div class="pb-2">
    <div>The brew is unevenly extracted, some of the coffee is over-extracted and some of the coffee is over-extracted. Try:</div>
    <ul>
        <li>Grind courser</li>
        <li>Increase agitation</li>
        <li>Remember to pour in circles over the coffee grounds</li>
    </ul>
</div>