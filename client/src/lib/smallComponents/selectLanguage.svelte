<script lang="ts">
    let line: HTMLElement;
    let isFocused = false;
    let isOverDialog = false;
    const languages = ["English", "French", "Chinese", "Spanish", "Maori"]
    let selectedLanguage = languages[0];
    function handleMouseOver() {
    isFocused = true;
    line.style.opacity = '1';
  }

  function handleMouseLeave() {
    isFocused = false;
      line.style.opacity = '0';

  }

  function handleFocus() {
    isFocused = true;
    line.style.opacity = '1';
  }

  function handleBlur() {
    isFocused = false;
    line.style.opacity = '0';
  }

</script>

<div class="relative" role="button" tabindex="0" aria-label="Hover" on:mouseenter={handleMouseOver} on:mouseleave={handleMouseLeave} on:focus={handleFocus} on:blur={handleBlur}>
    <p>{selectedLanguage}</p>
    <div bind:this={line} class="w-full h-[2px] bg-black opacity-0"/>

      <dialog on:mouseenter={() => isOverDialog = true} on:mouseleave={() => isOverDialog = false} class="absolute bottom-6 bg-gray-50 -left-2 rounded-xl"  open={isFocused || isOverDialog}>
        {#each languages as l, i}
          <button class="py-1 px-2" on:click={() => selectedLanguage = l}>{l}</button>
        {/each}
      </dialog>
  
</div>