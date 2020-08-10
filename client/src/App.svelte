<script>
  import Main from "./components/Main.svelte";
  import News from "./components/News.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/": Main,
    "/news/:id": News,
  };
</script>

<body>
  <Router {routes} />
</body>
