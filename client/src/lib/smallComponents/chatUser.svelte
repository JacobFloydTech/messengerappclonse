<script lang="ts">
	import type { User } from "../../types";
    import {selecteduser} from '../../store';
	import { onMount } from "svelte";

    export let friend: User
    let minutes: string = '';
    async function getLastMessage() {
        const req = await fetch('http://localhost:3000/getLastOnline', { 
            method: "POST",
            body: JSON.stringify({id: friend.id})
        })
        let {time} = await req.json();
        const now = Date.now();
        time = Number(new Date(time));
        const diff = now-time;
        minutes = `Last online ${Math.floor(diff/(1000*60))} minutes ago`
    }
    onMount(() => getLastMessage())
</script>

<button on:click={() => selecteduser.set(friend.id)} class="flex items-center md:space-x-4">
    <img class="h-12 aspect-square rounded-full" src={friend.profilePicture ?? '/default.jpg'} alt={`Chat picture ${friend.name}`}/>
    <div class="flex items-start flex-col">
        <p>{friend.name}</p>
        <p class="text-sm italic text-gray-500 hidden md:block">{minutes}</p>
    </div>
</button>