<script>
  import { onMount } from "svelte";
  import Bound from "bounds.js";

  const boundary = Bound({
    threshold: 1,
  });

  export let loadMore;
  let loader;

  const onReachBottom = () => {
    loadMore();
  };

  onMount(() => {
    boundary.watch(loader, onReachBottom);
  });
</script>

<style type="text/scss">
  .image {
    width: 100%;
    height: 80%;
    background-color: #ecf0f4;
    margin-bottom: 10px;
  }
  .info {
    width: 20%;
    height: 5%;
    background-color: #ecf0f4;
    margin-bottom: 10px;
  }
  .title {
    width: 100%;
    height: 10%;
    background-color: #ecf0f4;
  }
  .loadingSkeleton {
    width: 100%;
    height: 20rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    justify-content: space-evenly;
  }

  .image::before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #dce2e9 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
</style>

<div class="loadingSkeleton" bind:this={loader}>
  <div class="image" />
  <div class="info" />
  <div class="title" />
</div>
