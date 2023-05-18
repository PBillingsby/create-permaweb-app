<script lang="ts">
  import { Route, router } from 'tinro';
  import Announcer from './components/announcer.svelte';
  import Transition from './components/transition.svelte';
  import Home from './home.svelte';
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>

<main />

<Announcer />
<Transition>
  <Route path="/">
    <Home />
  </Route>
</Transition>

<style>
</style>
