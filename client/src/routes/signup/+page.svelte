<script lang="ts">
    let email: string, password: string, name: string, profilePicture: string;
    function handleEmail(e: Event) { 
        if (e.target instanceof HTMLInputElement) { 
            const target = e.target
            email = target.value
        }
    }
    function handlePassword(e: Event) { 
        if (e.target instanceof HTMLInputElement) { 
            const target = e.target
            password = target.value
        }
    }
    function handleName(e: Event) { 
        if (e.target instanceof HTMLInputElement) { 
            const target = e.target
            name = target.value
        }
    }
    function handleImage(e: Event) {
        if (e.target instanceof HTMLInputElement) { 
            const target = e.target as HTMLInputElement;
            if (!target.files) { return}
            const img = target.files[0];
            var reader = new FileReader();
            reader.onload = (e) => { 
                //@ts-ignore
                profilePicture = e.target?.result;
            }
            reader.readAsDataURL(img);
        } 
    }

    async function signUp() { 
        const request = await fetch('http://localhost:3000/signUp', 
            {method: "POST", body: JSON.stringify({name, email, password, profilePicture })}
        )
        console.log(await request.json());
    }

</script>

<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
    <div class="flex flex-col w-1/2 bg-gray-100 py-12 space-y-4 items-center justify-centerrounded-2xl">
        <img alt="Logo" class="aspect-square h-24 w-24" src="/messengerLogo.png"/>
        <h1 class="text-4xl font-semibold">Sign up today</h1>
        <input on:input={handleEmail} class="outline-none text-3xl placeholder:text-3xl px-4 py-2 rounded-xl" placeholder="Email"/>
        <input on:input={handleName} class="outline-none text-3xl placeholder:text-3xl px-4 py-2 rounded-xl" placeholder="Name"/>
        <input on:input={handlePassword} class="outline-none text-3xl placeholder:text-3xl px-4 py-2 rounded-xl" placeholder="Password" type="password"/>
        <div class="mt-4">
            <label for="fileInput" class="cursor-pointer text-blue-500">
                <p class="border-blue-500 border-2 rounded-2xl px-4 py-2 transition duration-300 hover:bg-blue-500 hover:text-white shadow-sm">Choose Profile Picture</p>
            <input accept=".jpg, .png, .jpeg" on:input={e => handleImage(e)} id="fileInput" type="file" class="hidden" />
            </label>
        </div>
        {#if profilePicture}

            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img class="w-24 h-24 rounded-full shadow-2xl" src={profilePicture} alt="Uploaded profile picture"/>

        {/if}
  
        <button on:click={signUp}>Sign up</button>
    </div>
</div>