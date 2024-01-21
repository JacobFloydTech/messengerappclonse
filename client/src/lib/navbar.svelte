<script>
    import NavbarButton from '$lib/smallComponents/navbarButton.svelte'
    let buttons = ["Features", "Desktop App", "Privacy and Safety", "For Developers"]
</script>

<div class="flex h-12 pt-8 xl:pt-4 md:px-2 justify-between items-center  xl:w-2/3 mx-auto">
    <img alt='Messenger Logo' class="h-9 aspect-square hidden xl:block" src={'/messengerLogo.png'}/>
    <div class="flex space-x-4 md:space-x-12">
        {#each buttons as content,i }
            <NavbarButton  {content}/>
        {/each}
    </div>
</div>