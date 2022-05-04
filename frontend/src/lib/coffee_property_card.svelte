<script lang="ts">
export let type: string; 
</script>

<div class="pb-2">
    <div class="font-light text-sm">{type}</div>
    <div class="font-thin">
        <slot/>
    </div>
</div>