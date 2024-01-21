<script>
	import SignInForm from './smallComponents/SignInForm.svelte';
</script>
<div class="grid xl:grid-cols-2 xl:w-2/3  mx-auto">
    <div class="flex ">
        <div class="flex  flex-col w-1/2 justify-around h-2/3 my-auto xl:mx-0 mx-auto items-center xl:items-start  px-4 space-y-10">
            <p class='xl:text-8xl text-5xl md:text-7xl py-2 text-center xl:text-left bg-gradient-to-r from-blue-800 via-purple-700 to-orange-400 to-[70%] text-transparent font-semibold bg-clip-text'>Hang out anytime, anywhere</p>
            <p>Messenger makes it easy and fun to stay close to your favourite people.</p>
            <SignInForm/>
            <div class="grid grid-cols-[55%_45%] gap-4 ">
                <button>
                    <img class="rounded-lg w-full h-full object-cover" src={'/appleDownload.png'} alt="Apple Download"/>
                </button>
                <button>
                    <img class="w-full h-full rounded-lg" src={'/microsoftDownload.png'} alt="Micosoft Download"/>
                </button>
            </div>
        </div>  
    </div>
    <div>
        <img alt="Main" src={'/signInPicture.png'}/>
</div>
</div>
