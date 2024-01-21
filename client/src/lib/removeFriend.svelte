<script lang="ts">
    import {friends} from '../store';
    export let id: string;
    async function removeFriend(selectedUserID: number) { 
       await fetch('http://localhost:3000/removeFriend', { method: "POST",
            body: JSON.stringify({id, selectedUserID})
        })
        const request = await fetch('http://localhost:3000/getFriends', {method: "POST", 
            body: JSON.stringify({id})
        })
        const {data} = await request.json();
        friends.set(data);
    }
</script>

<div>
    {#each $friends as friend}
        <div class="flex items-center space-x-4 justify-center">
            <img class="h-8 aspect-square rounded-full" alt="Friend profile pic" src={friend.profilePicture ?? '/default.jpg'}/>
            <p>{friend.name}</p>
            <button on:click={() => removeFriend(friend.id)} class="bg-red-500 px-4 py-2 rounded-full text-white">Remove friend</button>
        </div>
    {/each}
</div>