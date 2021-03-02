<script>
  import { Router, Route } from 'svelte-routing'
  import Home from './pages/home.svelte'
  import Detail from './pages/detail.svelte'
</script>

<Router>
  <Route path="/:name" let:params>
    <Detail name={params.name} />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
