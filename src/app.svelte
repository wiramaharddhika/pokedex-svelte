<script>
  import { Router, Route } from 'svelte-routing'
  import Home from './pages/home.svelte'
  import Detail from './pages/detail.svelte'
</script>

<Router>
  <Route path="/:idOrName" let:params>
    <Detail idOrName={params.idOrName} />
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
