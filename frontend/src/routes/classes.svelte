<svelte:head>
    <title>Tastings & Classes</title>
</svelte:head>

<script lang="ts">
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import classes from "./class.jpg"
</script>

<div class="font-bold text-4xl pb-2">Tastings & Classes</div>
<div>Join us live in Seattle for two-hour personalized tastings and classes. We share rare and interesting coffees and workshop dial-ins and brew. Learn to brew the perfect coffee, deep dive into a region or processing method, or just try our favorites.</div>
<br>
<div>Reach out to us at <EmailUsLink/> to schedule or learn more!</div>
<br>
<img src={classes} alt="Jacob pouring coffee!" class="m-0 h-96 lg:h-fit"/>