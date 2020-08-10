<script>
  let size = 100;
  let color = "#0652dd";
  let duration = "1.0s";
  let unit = "px";
</script>

<style>
  .wrapper {
    width: var(--size);
    height: var(--size);
  }
  .circle {
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    animation-duration: var(--duration);
    border-radius: 100%;
    display: inline-block;
    animation: scaleOut 1s ease-in-out infinite;
  }
  @keyframes scaleOut {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>

<div
  class="wrapper"
  style="--size: {size}{unit}; --color: {color}; --duration: {duration}">
  <div class="circle" />
</div>
