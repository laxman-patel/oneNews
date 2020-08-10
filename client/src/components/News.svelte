<script>
  export let params = {};
  import axios from "axios";
  import moment from "moment";
  import FectingSkeleton from "./FectingSkeleton.svelte";
  import { pop } from "svelte-spa-router";
  import { fly } from "svelte/transition";

  let promise = getContent();

  async function getContent() {
    let data = await axios.get(
      `http://155.138.207.40:3000/news/id/${params.id}`
    );

    return data.data[0];
  }
</script>

<style>
  @media only screen and (min-width: 900px) {
    .contentPage {
      margin-left: 10vw;
      margin-right: 10vw;
    }
  }

  @media only screen and (min-width: 1200px) {
    .contentPage {
      margin-left: 20vw;
      margin-right: 20vw;
    }
  }

  .content-img {
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
  }

  .content-meta {
    margin-top: 0px;
    display: flex;
    margin-bottom: -13px;
  }

  .content-source {
    text-decoration: none;
    font-weight: 600;
    opacity: 0.8;
    color: #0652dd;
  }

  .content-date {
    opacity: 0.5;
    font-weight: 600;
    text-decoration: none;
    margin-left: 10px;
  }

  .content-card-title {
    text-decoration: none;
    margin-top: 0px;
    letter-spacing: -2%;
    font-weight: 600;
    line-height: 27px;
  }

  .content-content {
    margin-top: 20px;
  }

  .content-whitespace {
    height: 2vh;
  }

  .arrow-icon {
    border-radius: 100%;
    position: fixed;
    top: 2rem;

    cursor: pointer;
    -webkit-box-shadow: 8px 8px 27px 0px rgba(50, 50, 50, 0.22);
    -moz-box-shadow: 8px 8px 27px 0px rgba(50, 50, 50, 0.22);
    box-shadow: 8px 8px 27px 0px rgba(50, 50, 50, 0.22);
  }
  .loader {
    margin-left: 32vw;
    margin-top: 40vh;
  }
</style>

<div in:fly={{ y: 1000, duration: 300 }} out:fly={{ y: 1000, duration: 300 }}>

  {#await promise}
    <div class="loader">
      <FectingSkeleton />
    </div>
  {:then data}
    <img
      on:click={() => pop()}
      class="arrow-icon"
      src="images/backIcon.svg"
      alt="back icon" />

    <div class="contentPage">
      <img alt="" src={data.imgLink} class="content-img" />
      <div>
        <div class="content-meta">
          <p class="content-source">{data.source}</p>
          <p class="content-date">
            {moment(data.date).fromNow().replace(' hours', 'h')}
          </p>

        </div>
        <h2 class="content-card-title">{data.title.replace('- CNET', '')}.</h2>
        <p class="content-content">
          {@html data.content.replace(new RegExp('\n', 'g'), '<br />')}
        </p>

      </div>
      <div class="content-whitespace" />
    </div>

  {/await}
</div>
