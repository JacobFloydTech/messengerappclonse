<script lang="ts">
	import type { FriendRequest } from "../../types";
    import {friends} from '../../store'

    export let id: string;
    export let request: FriendRequest;
    export let getFriendRequests: Function;
    async function Accept() {
        await fetch('http://localhost:3000/acceptFriendRequest', { 
            method: "POST",
            body: JSON.stringify({id, sendingUserID: request.userID})
        })
        const response = await fetch('http://localhost:3000/getFriends' , {
            method: "POST",
            body: JSON.stringify({id}),
        })
        const {data} = await response.json();
        friends.set(data);
        getFriendRequests()
    }
    async function Deny() {
        await fetch('http://localhost:3000/denyFriendRequest', { 
            method: "POST",
            body: JSON.stringify({id, sendingUserID: request.userID})
        })
    }
</script>

<div class="flex space-x-4 items-center px-4 py-2">
    <img class="h-8 w-8 rounded-full" src={request.SendingUser?.profilePicture ?? '/default.jpg' } alt={`Friend request from ${request.SendingUser?.name}`}/>
    <p>{request.SendingUser?.name}</p>
    <button on:click={Accept} class="px-4 py-2 bg-green-500 rounded-full text-white">Accept</button>
    <button on:click={Deny} class="px-4 py-2 bg-red-500 rounded-full text-white">Deny</button>
</div>