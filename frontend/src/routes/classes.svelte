<svelte:head>
    <title>Tastings & Workshops</title>
</svelte:head>

<script lang="ts">
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import classes from "./class.jpg"
</script>

<div class="font-bold text-4xl pb-2">Events & Workshops</div>
<div>Join us live in Seattle to taste rare, special coffees and step up your brew! Reach out to us at <EmailUsLink/> to schedule or learn more!</div>
<br>
<div class="font-medium text-2xl">Personalized Workshops</div>
<div>Learn to dial-in and brew coffee perfectly in a 2-hour session. Tell us what you like, and we will source special coffees just for you! We will taste our way through dialing the coffee, get into the minutiae of brewing perfect coffee, and help you debug your own brew. </div>
<br>
<div class="font-medium text-2xl">Tastings</div>
<div>Tasting events for parties of 15 or more! We share flights of diverse, interesting coffees and showcase brewing and tasting. Corporate events, parties, friends and family - we do it all!</div>
<br>
<img src={classes} alt="Jacob pouring coffee!" class="m-0 object-cover"/>