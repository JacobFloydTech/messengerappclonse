<script lang="ts">
	import { onMount } from "svelte";
	import SendMessageSvg from "./sendMessageSVG.svelte";
    import {parentMessage} from '../../store';


    export let id: string;
    export let RecievingID: string | null;
    let content: string;
    let inputElement: HTMLInputElement;
    export let getMessages: Function;

    async function sendMessage() { 
        if (content == '') return
        await fetch('http://localhost:3000/sendMessage', { method: "POST",
            body: JSON.stringify({id, selectedUserID: RecievingID, content, parentID: $parentMessage?.id}) 
        })
    

            inputElement.value = '';
        
        getMessages()
        parentMessage.set(null)
    }

    onMount(() => { 
        document.addEventListener('keydown', ({code}) => { 
            if (code == "Enter") { 
                sendMessage();
                content = '';
                inputElement.value = '';                
            }
        })
    })

    function setMessage(e: Event) { 
        content = (e.target as HTMLInputElement).value
    }
</script>
<div class="flex flex-col space-y-2">
    {#if $parentMessage}
        <div class="flex p-4 items-center justify-between space-x-2 w-3/4 bg-gray-100 rounded-2xl mx-auto">
            <p class="break-all italic text-sm">{$parentMessage.content}</p>
            <button on:click={() => parentMessage.set(null)}>Remove reply</button>
        </div>
    {/if}
    <div class="flex border-2 rounded-full w-full px-4 py-1">
        <input bind:this={inputElement} on:input={setMessage} placeholder="Send message here" class="outline-none w-[95%]"/>
        <button  on:click={sendMessage} class="w-[5%]">
            <SendMessageSvg/>
        </button>
</div>
</div>