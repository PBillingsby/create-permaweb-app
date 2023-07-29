const vitePreprocess = import('@sveltejs/vite-plugin-svelte').then(m => m.vitePreprocess())

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: {
    script: async (options) => (await vitePreprocess).script(options),
    style: async (options) => (await vitePreprocess).style(options),
  },
}