<script>
	import { page } from '$app/stores';

	function menuOpen() {
		document.querySelector(".nav-open").classList.toggle("menu-open")
	};
</script>

<header>
	<nav class="nav-open">
		<svg on:click={menuOpen} version="1.1" class="menu-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 131.1 102" style="enable-background:new 0 0 131.1 102;" xml:space="preserve">
		<path class="st0" style="filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));" d="M125.4,11.4l-119.7,0C2.6,11.4,0,8.9,0,5.7l0,0C0,2.6,2.6,0,5.7,0l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0
			C131.1,8.9,128.6,11.4,125.4,11.4z"/>
		<path class="st0" style="filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));" d="M125.4,56.7l-119.7,0C2.6,56.7,0,54.2,0,51l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0
			C131.1,54.2,128.6,56.7,125.4,56.7z"/>
		<path class="st0" style="filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));" d="M125.4,102L5.7,102C2.6,102,0,99.5,0,96.3l0,0c0-3.2,2.6-5.7,5.7-5.7l119.7,0c3.2,0,5.7,2.6,5.7,5.7v0
			C131.1,99.5,128.6,102,125.4,102z"/>
		</svg>
		

		<ul>
			<li><a href="#project">Projects I'm proud off</a></li>
			<li><a href="#about">About</a></li>
			<li><a href="#contact">Contact</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		z-index: 5;
	}

	ul {
		opacity: 0%;
		transition: ease all 0.3s;
		transform: translateX(100%);
	}

	:global(.menu-open ul) {
		opacity: 100%;
		
		transform: translateX(0);
	}

	li {
		list-style: none;

		padding: 1rem;
		margin: 1.5rem 0rem;

		background-color: var(--white-color);
		-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, .5); 
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .5);
		transition: ease 0.3s;
	}

	li:hover {
		background-color: var(--main-color);
	}

	a {
		text-decoration: none;
		color: var(--black-color);

		writing-mode: vertical-rl;
		text-orientation: mixed;
	}

	nav {
		position: fixed;
		top: calc(100vh - 75%);
		right: 0;
	}

	.menu-icon {
		fill: var(--white-color);
		width: 2rem;
		height: auto;
		position: fixed;
		top: 1rem;
		right: 1rem;
	}


	@media only screen and (min-width: 48rem) {
		.menu-icon {
			display: none;
		}

		ul {
			opacity: 100%;
			transform: translateX(0);
		}
	}
</style>
