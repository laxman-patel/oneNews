<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import moment from "moment";
  import LoadingSkeleton from "./loadingSkeleton.svelte";
  import { link } from "svelte-spa-router";
  import { fade, slide } from "svelte/transition";
  let currentPage = 1;
  let totalPages = 1;
  let newsArr = [];

  let hasViewedAll = false;

  let currentQuery = `topnews`;

  if (currentPage > totalPages) {
    hasViewedAll = true;
  }

  let changingSelection = false;

  async function getNews(page = 1, selection = "topnews", limit = 10) {
    const response = await axios.get(
      `https://api.onenews.media/news/${selection}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  }

  getNews(currentPage, currentQuery).then((res) => {
    window.scrollTo(0, 0);

    let newsList = res.data;

    newsList.map((news) => {
      newsArr = [...newsArr, news];
    });

    totalPages = res.totalPages;
  });

  function onSelectionchange() {
    currentPage = 1;
    changingSelection = true;
    newsArr = [];
    getNews(currentPage, currentQuery)
      .then((res) => {
        res = res.data;

        res.map((news) => {
          newsArr = [...newsArr, news];
        });
      })
      .then(() => {
        changingSelection = false;
      });
  }

  function loadMore() {
    if (!changingSelection) {
      if (currentPage !== totalPages) {
        currentPage++;
        getNews(currentPage, currentQuery).then((res) => {
          res = res.data;

          res.map((news) => {
            newsArr = [...newsArr, news];
          });
        });
      }
    }
  }
</script>

<style type="text/scss">
  .newsList {
    margin: 5px 10px 0px 10px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
  ul {
    margin-left: 8px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 40px;
    li {
      font-family: "Poppins";
      list-style: none;

      h2 {
        margin: 0;
        line-height: 1.9rem;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
      img {
        width: 100%;
        border-radius: 5px;
      }

      .info {
        margin-top: 10px;
        margin-bottom: 0px;
        display: flex;
        .source {
          color: #0652dd;
        }
        .date {
          font-weight: 600;
          opacity: 0.5;
          margin-left: 10px;
        }
      }
    }
  }
  select {
    margin-bottom: -8px;
    margin-top: 10px;
    color: #0652dd;
    font-family: "Poppins";
    font-size: 2.3rem;
    background: none;
    padding: 0;
    border: none;
    font-weight: 800;
    letter-spacing: -0.02rem;

    width: 13rem;
  }

  select:focus {
    outline: none;
  }

  .end {
    color: #0652dd;
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
  }

  @media only screen and (min-width: 1000px) {
    ul {
      grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
  }
</style>

<div class="newsList">

  <!-- svelte-ignore a11y-no-onchange -->
  <select
    bind:value={currentQuery}
    on:change={() => {
      onSelectionchange();
    }}>
    <option value="topnews">TOP</option>
    <option value="sportsnews">SPORTS</option>
    <option value="technews">TECH</option>
    <option value="marketnews">BUSINESS</option>
  </select>

  <ul>

    {#each newsArr as news, i}
      <li class="news" in:fade>
        <a href={`/news/${news._id}`} use:link>

          <img alt="" src={news.imgLink} width="300px" />

          <div class="info">
            <p class="source">{news.source}</p>
            <p class="date">{moment(news.date).fromNow()}</p>
          </div>
          <h2>{news.title}.</h2>
        </a>
      </li>
    {/each}

    {#if hasViewedAll === true}
      <p class="end">The End!</p>
    {:else}
      {#each Array(10) as _}
        <li>

          <LoadingSkeleton {loadMore} />

        </li>
      {/each}
    {/if}

  </ul>

</div>
