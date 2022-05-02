<svelte:head>
</svelte:head>

<script lang="ts">    
    import { onMount } from "svelte";
    import "$lib/glide_css/css/glide.core.min.css"
    import "$lib/glide_css/css/glide.theme.min.css"
    export let imageUrls: string[];
    export let carouselId: string;

    onMount(async () => {
        const module = await import("@glidejs/glide");
        const Glide = module.default;
        const carousel = new Glide(`.${carouselId}`).mount();
    });
</script>

<div class="glide {carouselId}">
    <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
            {#each imageUrls as imageUrl}
                <li class="glide__slide">
                    <img src={imageUrl} alt="coffee" class="m-auto"/>
                </li>
            {/each}
        </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">❮</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">❯</button>
    </div>
</div>
