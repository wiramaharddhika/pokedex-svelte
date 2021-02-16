<script>
  import { Router, Link, Route } from 'svelte-routing'
  import Home from './pages/home.svelte'
  import Detail from './pages/detail.svelte'
</script>

<Router>
  <Route path="/:id">
    <Detail />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>
