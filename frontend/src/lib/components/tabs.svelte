<script>
    import { onMount } from "svelte";
  
    export let items = [];
    export let activeTabValue;
  
    onMount(() => {
      // Set default tab value
      if (Array.isArray(items) && items.length && items[0].value) {
        activeTabValue = items[0].value;
      }
    });
  
    const handleClick = tabValue => () => (activeTabValue = tabValue);
  </script>
  
  <ul class="tabs px-0">
    {#if Array.isArray(items)}
      {#each items as item}
        <li class={activeTabValue === item.value ? 'tab tab-lifted tab-active' : 'tab tab-lifted'}>
          <span on:click={handleClick(item.value)}>{item.label}</span>
        </li>
      {/each}
    {/if}
  </ul>