<script lang="ts">
	import ChatUser from './smallComponents/chatUser.svelte';
    import {friends} from '../store'
    
</script>

<div class="flex flex-col border-2">
    {#each $friends as friend }
        <ChatUser {friend}/>
    {/each}
</div>