<script lang="ts">
    import {parentMessage} from '../../store';
    import type {Message} from '../../types'
    export let id: string;
    export let message: Message;

    const setMessage = () => { 
        if ($parentMessage?.id == message.id) { 
            parentMessage.set(null)
        } else { 
            parentMessage.set(message);
        }
    }
</script>

<div class={`flex  flex-col ${parseFloat(id) == message.authorID ? ' justify-end' : 'justify-start'}`}>
    {#if message.parentMessage}
        <div class={`flex pt-2 ${parseFloat(id) == message.authorID ? 'justify-end' : "justify-start"}`}>
            <p class="bg-gray-50 rounded-t-2xl px-4 py-2 text-sm italic inline-block">Hello there</p>
        </div>
    {/if}
        <div class={`${parseFloat(id) == message.authorID ? "flex-row-reverse" : ""} flex`}>
            <img class="h-8 aspect-square rounded-full border-2 border-gray-400 mx-2" src={message.author?.profilePicture ?? '/default.jpg'} alt="message profile pic"/>
            <p class={`max-w-96 flex flex-wrap break-all rounded-full px-4 py-2  ${parseFloat(id) == message.authorID ? 'bg-gray-100 pl-4' : "bg-blue-500 flex-row-reverse pr-4"}`}>{message.content}</p>   
        </div>
        <div class={`flex px-12 py-2 ${parseFloat(id) == message.authorID ? 'justify-end' : "justify-start"}`}>
        <button>
            <p class="italic text-sm">Reply</p>
        </button>
    </div>

</div>