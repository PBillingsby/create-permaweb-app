<script lang="js">
  // @ts-nocheck

  import { Route, router } from 'tinro';
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
  import Announcer from './components/announcer.svelte';
  import Transition from './components/transition.svelte';
  import Home from './home.svelte';
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
