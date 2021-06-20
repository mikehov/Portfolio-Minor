import adaptStatic from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        adapter: adaptStatic(),
        
        target: '#svelte'
    }
};

export default config;