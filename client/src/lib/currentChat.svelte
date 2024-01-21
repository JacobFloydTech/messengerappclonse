<script lang="ts">
	import { onMount } from 'svelte';
    export let id: string
    import {selecteduser} from '../store'
	import type { Message } from '../types';
	import MessageComponent from './smallComponents/messageComponent.svelte';
	import SendMessage from './smallComponents/sendMessage.svelte';
    import supabase from './supabase';
    let container: HTMLElement

    let messages: Message[];
    async function getMessages() { 

        const request = await fetch('http://localhost:3000/getMessages', { 
            method: "POST", body: JSON.stringify({id, selectedUserID: $selecteduser})
        })
        const {messages: data} = await request.json();
        messages = data;
        scroll(true)

   
    }
    selecteduser.subscribe(() => {
        if ($selecteduser == null) { return}
        getMessages(); setChannel()
    })
    
    function setChannel() {
        supabase
            .channel('messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: '*', filter: `authorID=in.(${id}, ${$selecteduser})` }, (payload) => { 

                    messages = [...messages, payload.new as Message];
                    scroll(false)
            })
            .subscribe()
    }

    const scroll = (instant: boolean) => setTimeout(() => {
            container.scrollTo({top: container.scrollHeight, behavior: instant ? 'instant' : "smooth"})

        }, 1);


</script>

{#if !$selecteduser}
<div class="flex flex-col items-center justify-center space-y-4 text-gray-400  font-semibold md:font-bold ">
    <h1 class="md:text-5xl tex-xl ">Open a chat to get started!</h1>
    <h2 class="md:text-2xl tex-xl text-center">Or add someone using the search function</h2>
</div>
{:else}

<div class="flex flex-col max-h-screen overflow-hidden p-4">
    <div  class="flex flex-col space-y-2 max-h-screen overflow-y-auto mb-4">
        {#if messages}
            <div bind:this={container} class="flex flex-col space-y-4 overflow-x-hidden">
                {#each messages as message}
                    <MessageComponent {id} {message}/>
                {/each}
            </div>
            <SendMessage {getMessages} {id} RecievingID={$selecteduser +''}/>
        {/if}
    </div>
</div>
{/if}
