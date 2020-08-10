<script>
  import axios from "axios";
  import moment from "moment";
  const API_KEY = "e6d70bb7ae095433f0d93b9543246afe";

  let temp = `-`;

  async function getTemp(lat, lon) {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            units: "metric",
            appid: API_KEY,
          },
        }
      );

      return response.data.main.temp;
    } catch (error) {
      console.log(error);
    }
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    temp = await getTemp(position.coords.latitude, position.coords.longitude);
  });
</script>

<style type="text/scss">
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap");

  $brand-color: #0652dd;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 5px 10px 0px 10px;
  }
  .temp {
    h1 {
      font-family: "Poppins";
      font-weight: 700;
      letter-spacing: -0.1rem;
      margin: 0;
      font-size: 2.1rem;
      opacity: 0.7;
    }
  }

  .dateAndLogo {
    h1 {
      font-family: "Poppins";
      font-weight: 700;
      letter-spacing: -0.1rem;
      margin: 0;
      font-size: 2.1rem;

      span {
        color: $brand-color;
      }
    }

    .date {
      opacity: 0.5;
      margin-top: -1rem;
      font-size: 2.1rem;
    }
  }
  .seperatorLine {
    margin: -5px 10px 0px 10px;
    height: 2px;
    background-color: #000;
    opacity: 0.2;
  }
</style>

<div class="header">
  <section class="dateAndLogo">
    <h1>
      <span>ONE</span>
      NEWS
    </h1>
    <h1 class="date">{moment().format('MMMM DD').toUpperCase()}</h1>
  </section>
  <section class="temp">
    <h1>{!isNaN(temp) ? `${Math.ceil(temp)}°C` : temp}</h1>
  </section>

</div>
<hr class="seperatorLine" />
