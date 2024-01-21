<script lang="ts">
	import type { User } from "../types";
	import QueriedUser from "./smallComponents/queriedUser.svelte";
	import SearchPeopleSvg from "./smallComponents/searchPeopleSVG.svelte";

    export let id: string;
    let query: string;
    let queriedUsers: User[] = []

    function handleInput(e: Event) { 
        query = (e.target as HTMLInputElement).value
        searchUsers();
    }
    async function searchUsers() { 
        if (!query) { return queriedUsers = []}
        const req = await fetch('http://localhost:3000/searchUsers', { 
            method: "POST", 
            body: JSON.stringify({query, id})
        })
        const {users} = await req.json();
        queriedUsers = users;
    }
</script>

<div class="flex items-center py-12 flex-col">
    <div class="w-3/4 md:w-2/3 flex bg-white rounded-full overflow-hidden p-2">
        <input on:input={handleInput} class=" flex ml-2 items-center w-[90%] placeholder:text-lg md:placeholder:text-xl outline-none" placeholder="Enter query here"/>
        <SearchPeopleSvg/>
    </div>
    {#if queriedUsers} 
        {#each queriedUsers as user}
            <QueriedUser {user} {id}/>
        {/each}
    {/if}
</div>