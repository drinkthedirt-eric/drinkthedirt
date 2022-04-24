<script lang="ts">
  export let type: string; 
</script>

<div class="pb-2">
  <div class="font-semibold">{type}</div>
  <div>
    <slot/>
  </div>
</div>