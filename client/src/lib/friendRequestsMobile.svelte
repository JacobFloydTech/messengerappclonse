<script lang="ts">
	import { onMount } from "svelte";
	import type { FriendRequest, User } from "../types";
	import HandleIncomingRequest from "./smallComponents/handleIncomingRequest.svelte";
    import HandleOutgoingRequest from "./smallComponents/handleOutgoingRequest.svelte"
	import RemoveFriend from "./removeFriend.svelte";
    export let id: string;
    let index: number = 0;

    let element: HTMLDivElement;
    
    let incoming: FriendRequest[] = []
    let outgoing: FriendRequest[] = []
    async function getFriendRequests() { 
        const req = await fetch('http://localhost:3000/getFriendRequests', { method: "POST", body: JSON.stringify({id})})
        const {sentRequests, incomingRequests } = await req.json();
        incoming = incomingRequests;
        outgoing = sentRequests;
    }
    function setCols() { 
        Array.from(element.children).forEach((e,i) => { 
            (e as HTMLElement).style.width = `${window.outerWidth}px`;
            (e as HTMLElement).style.marginLeft = `${window.outerWidth*i}px`
        })
    }
    onMount(() => {
        getFriendRequests();
        setCols()
    })
    const handleButtonChange = (input: number) => { 
        index = input;
        element.scrollTo({left: window.outerWidth*input, behavior: "smooth"})
    }
</script>

<div>
    <div class="flex text-xl space-x-2 md:hidden w-full justify-around">
        <button on:click={() => handleButtonChange(0)} class={`${index == 0 ? 'scale-100' : 'scale-75'} transition-all duration-150`}>Incoming</button>
        <button on:click={() => handleButtonChange(1)}  class={`${index == 1 ? 'scale-100' : 'scale-75'} transition-all duration-150`}>Outgoing</button>
        <button on:click={() => handleButtonChange(2)}  class={`${index == 2 ? 'scale-100' : 'scale-75'} transition-all duration-150`}>Manage friends</button>
    </div>
    <div id='mobileContainer' bind:this={element} class="relative h-[270px] md:hidden  overflow-x-scroll">
        <div class="absolute h-full ">
            {#each incoming as request }
                <HandleIncomingRequest {id} {request}/>
            {/each}
        </div>
        <div class="border-2 absolute h-full ">
            {#each outgoing as request }
            <HandleOutgoingRequest {id} {request}/>
            
        {/each}
        </div>
        <div class="absolute h-full ">
            <RemoveFriend {id} />
        </div>
    </div>
</div>