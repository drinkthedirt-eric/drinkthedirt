<svelte:head>
    <title>Community</title>
</svelte:head>

<script lang="ts">
    import friends from "./friends.png"
    import DiscordLink from "$lib/links/discord_link.svelte";
    import EmailUsLink from "$lib/links/email_us_link.svelte";
    import InstagramLink from "$lib/links/instagram_link.svelte";
</script>

<div class="font-bold text-4xl pb-2">Community</div>
<div>We are Luke and Jacob, and we love coffee! We've been exploring coffee terroir for a long time and are forever in chase of the perfect brew. We started Drink the Dirt to share our journey with you. We're based out of Seattle, WA. Reach out if you're in town!</div>
<br/>
<div>Join our community of coffee geeks on <DiscordLink/>. We talk coffee brewing, equipment, roasters, and shops, sharing experiences and advice. We also here to troubleshoot and make your coffee better.</div>
<br/>
<div>Say hello anytime at <EmailUsLink /> or follow us on <InstagramLink /> for updates.</div>
<br/>
<img src={friends} alt="Friends <3<3>" class="m-0 object-cover"/>