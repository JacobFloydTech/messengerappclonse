<script lang="ts">
	import type { FriendRequest } from "../../types";

    export let request: FriendRequest;
    export let id: string;
    export let getFriendRequests: Function
    async function deleteRequest() { 
        await fetch('http://localhost:3000/denyFriendRequest', { 
            method: "POST",
            body: JSON.stringify({sendingUserID: id, id: request.RecievingUserID})
        })
        getFriendRequests();
    }
    
</script>

<div class="flex items-center py-2 space-x-4 w-2/3 mx-auto">
    <img class="h-8 w-8 rounded-full" src={request.RecievingUser?.profilePicture ?? '/default.jpg'} alt={`Friend request from ${request.RecievingUser?.name}`}/>
    <p>{request.RecievingUser?.name}</p>
    <button class="bg-red-800 text-white px-4 py-2 rounded-full">Delete request</button>
</div>