<script lang="ts">
	import { onMount } from "svelte";
	import type { FriendRequest, User } from "../types";
	import HandleIncomingRequest from "./smallComponents/handleIncomingRequest.svelte";
    import HandleOutgoingRequest from "./smallComponents/handleOutgoingRequest.svelte"
	import RemoveFriend from "./removeFriend.svelte";
    export let id: string;
    
    let incoming: FriendRequest[] = []
    let outgoing: FriendRequest[] = []
    async function getFriendRequests() { 
        const req = await fetch('http://localhost:3000/getFriendRequests', { method: "POST", body: JSON.stringify({id})})
        const {sentRequests, incomingRequests } = await req.json();
        incoming = incomingRequests;
        outgoing = sentRequests;
    }
    onMount(() => getFriendRequests())
</script>

<div class="hidden md:grid w-full h-full grid-cols-3">
    <div class="flex flex-col h-full overflow-y-auto">
        <h2 class="text-center font-semibold mb-4 py-2 text-2xl">Incoming Requests</h2>
        {#each incoming as request }
            <HandleIncomingRequest {getFriendRequests} {id} {request}/>
        {/each}
    </div>
    <div class="flex flex-col h-full overflow-y-auto">
        <h2 class="text-center font-semibold mb-4 py-2 text-2xl">Outgoing Requests</h2>
        {#each outgoing as request }
            <HandleOutgoingRequest {getFriendRequests} {id} {request}/>
            
        {/each}
    </div>
    <div class="flex flex-col h-full overflow-y-auto">
        <h2 class="text-center font-semibold mb-4 py-2 text-2xl">Manage friends</h2>
        <RemoveFriend {id} />
        
    </div>
</div>