<script lang="ts">
	import Footer from "$lib/footer.svelte";
	import Navbar from "$lib/navbar.svelte";
import SignIn from "$lib/signIn.svelte";


</script>

<div class="flex flex-col  items-center justify-between absolute top-0 left-0 w-full h-full">
	<Navbar/>
	<SignIn/>
	<Footer/>
</div>