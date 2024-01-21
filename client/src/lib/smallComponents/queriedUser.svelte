<script lang="ts">
	import type { User } from "../../types";

    export let user: User;
    export let id: string
    async function sendFriendRequest() { 
        const req = await fetch('http://localhost:3000/sendFriendRequest', { 
            method: "POST",
            body: JSON.stringify({sendID: id, recieveID: user.id})
        })
        console.log(await req.json());
    }

</script>

<div class="md:w-1/3 w-2/3 my-4 text-lg md:text-2xl flex space-x-4 items-center justify-center">
    <img class="w-14 aspect-square rounded-full" src={user.profilePicture ?? '/default.jpg'} alt={user.name}/>
    <p>{user.name}</p>
    <button class="px-4 py-2 bg-green-500 rounded-full text-white" on:click={sendFriendRequest}>Add Friend</button>
</div>