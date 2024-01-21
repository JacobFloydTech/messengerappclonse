<script lang="ts">
    export let content: string;
    let line: HTMLElement
</script>

<div aria-label="hoverButton" role="button" tabindex="0" on:mouseenter={() => line.style.opacity = '1'} on:mouseleave={() => line.style.opacity = '0' }>
    <p class="font-semibold">{content}</p>
    <div bind:this={line} class="w-full h-[2px] bg-blue-400 opacity-0"/>
</div>