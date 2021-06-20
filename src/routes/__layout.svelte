<script>
	import Header from '$lib/Header/Header.svelte';
	import Footer from '$lib/Footer/Footer.svelte';
	import '../app.css';
</script>

<Header></Header>

<main>
	<slot />
</main>

<Footer></Footer>
