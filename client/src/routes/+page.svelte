<script lang="ts">
	import { onMount } from 'svelte';
    import type {PageData} from './$types'
	import Chats from '$lib/chats.svelte';
	import AddFriend from '$lib/addFriend.svelte';
	import FriendRequests from '$lib/friendRequests.svelte';
	import CurrentChat from '$lib/currentChat.svelte';
	import HomeSvg from '$lib/smallComponents/homeSVG.svelte';
    import AddFriendSVG from '$lib/smallComponents/addFriendSVG.svelte'
    import SearchPeopleSVG from '$lib/smallComponents/searchPeopleSVG.svelte'
    import {friends, selecteduser, highlight} from '../store';
	import FriendRequestsMobile from '$lib/friendRequestsMobile.svelte';

    export let data: PageData;
    let addFriends: HTMLDialogElement, showRequests: HTMLDialogElement;
    let {id}  =data;
    async function getFriends() { 
        const req = await fetch('http://localhost:3000/getFriends', { method: "POST", body: JSON.stringify({id})})
        const {data} = await req.json();
        friends.set(data);
    }
    function openShowRequests() { 
        showRequests.open = !showRequests.open;
        addFriends.open = false;
    }

    function openAddFriends() { 
        addFriends.open = !addFriends.open;
        showRequests.open = false;
    }
    function checkPress(e: KeyboardEvent) {
        if (e.code == 'Escape') { 
            addFriends.open = false;
            showRequests.open = false;
            highlight.set(0)
        }
    }

    onMount(() => { 
        getFriends()
        document.addEventListener('keydown', checkPress)
    })
    const Home = () => {selecteduser.set(null); highlight.set(0); addFriends.open = false; showRequests.open = false;}
    const Requests = () => { openShowRequests();highlight.set(1);}
    const Search = () => {openAddFriends(); highlight.set(2)}
</script>


<div>
    
    <div class="md:grid-cols-[10%_30%_60%] grid-cols-[25%_75%] grid absolute top-0 left-0 w-full md:mt-0 md:px-12 md:h-full h-[90%] ">
        <div class="md:flex flex-col justify-between py-4 hidden">
            <button on:click={Home}>
                <HomeSvg/>
            </button>
        <div class="flex space-y-4 flex-col">
                <button  on:click={Requests} class="p-2">
                    <AddFriendSVG/>
                </button>
                <button on:click={Search} class="p-2">
                    <SearchPeopleSVG/>
                </button>
            </div>
        </div>
        <dialog class="md:w-1/2 w-full h-1/2 shadow-2xl rounded-2xl top-1/2 absolute -translate-y-2/3 translate-x-1/6 bg-gray-200  md:-translate-y-1/2"  bind:this={addFriends}>
            <AddFriend {id}/>
        </dialog>
        <dialog class="md:w-1/2 w-full h-1/2 shadow-2xl rounded-2xl top-1/2 absolute translate-x-1/6 bg-gray-200 -translate-y-1/2" bind:this={showRequests}>
            <FriendRequests {id}/>
            <FriendRequestsMobile {id}/>
        </dialog>
        <Chats/>
        <CurrentChat {id}/>
    </div>
    <div class="md:hidden flex w-full justify-around absolute bottom-0 ">
        <button on:click={Home}>
            <HomeSvg/>
        </button>

            <button  on:click={Requests} class="p-2">
                <AddFriendSVG/>
            </button>
            <button on:click={Search} class="p-2">
                <SearchPeopleSVG/>
            </button>

    </div>
    
</div>