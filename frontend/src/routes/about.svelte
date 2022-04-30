<svelte:head>
    <title>About</title>
</svelte:head>

<script lang="ts">
    import friends from "./friends.png"
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import InstagramLink from "$lib/links/instagram_link.svelte";
</script>

<div class="font-bold text-4xl pb-2">About Us</div>
<div>We are Luke and Jacob, and we love coffee! We've been exploring coffee terroir for a long time and are forever in chase of the perfect brew. We started Drink the Dirt to share our journey with you.</div>
<br>
<div>Drink the Dirt is based out of Seattle. Reach out if you're in town at <EmailUsLink /> or on <InstagramLink />!</div>
<br>
<img src={friends} alt="Friends <3<3>" class="m-0 h-96 lg:h-fit"/>