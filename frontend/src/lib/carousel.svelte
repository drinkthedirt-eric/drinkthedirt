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

<div class="glide {carouselId} -m-2 -mb-6">
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

<style>
.glide__arrow {
    position: absolute;
    display: block;
    top: 50%;
    z-index: 2;
    color: black;
    text-transform: uppercase;
    padding: 0px 0px;
    -webkit-text-stroke: 1px white;
    background-color: transparent;
    font-size: xx-large;
    border: 0px;
    border-radius: 0px;
    box-shadow: none;
    text-shadow: none;
    opacity: 1;
    cursor: pointer;
    transition: opacity 150ms ease, border 300ms ease-in-out;
    transform: 0;
    line-height: 1;
}

.glide__arrow--left {
  left: 5%;
}
.glide__arrow--right {
  right: 5%;
}
</style>