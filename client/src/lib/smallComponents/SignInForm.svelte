<script lang="ts">
    let email: string
    let password: string 
    let error: string | null = null;
    import Cookies from 'js-cookie'
    function handleEmail(e: Event) { 
        if (e.target instanceof HTMLInputElement) { 
            var target = e.target as HTMLInputElement;
            email = target.value;
        }
    }
    function handlePassword(e: Event) { 
        if (e.target instanceof HTMLInputElement) { 
            var target = e.target as HTMLInputElement;
            password = target.value;
        }
    }

    async function auth() { 
        
        const request = await fetch('http://localhost:3000/signIn', { method: "POST",body: JSON.stringify({email, password})})
        if (!request.ok) { 
            const {error: data} = await request.json();
            error = data;
            setTimeout(() => {
                error = null;
            }, 4000);
        } else { 
            const {token} = await request.json();
            Cookies.set('token', token, {expires: 7})
            window.location.href ='/'
        }
    }
</script>


<div class="flex flex-col space-y-2">
    <input class="rounded-2xl px-4 py-2 bg-blue-400 text-white placeholder:text-white outline-none " on:input={(e) => handleEmail(e)} placeholder="Enter email..."/>
    <input class="rounded-2xl px-4 py-2 bg-blue-400 text-white placeholder:text-white  outline-none" on:input={(e) => handlePassword(e)} placeholder="Enter password..." type='password'/>
    <button on:click={auth} class="rounded-2xl w-1/2 mx-auto bg-blue-400 text-white px-4 py-2">Sign in</button>
    {#if error}
        <div class="px-4 py-2 bg-red-500 text-white rounded-2xl">
            <p>{error}</p>
        </div>
    {/if}
</div>