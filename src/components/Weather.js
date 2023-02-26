import { useState, useEffect } from "react";

const Weather = () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=07302&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric&lan=zh_cn`;
  const rateUrl = `https://api.apilayer.com/exchangerates_data/convert?to=cny&from=usd&amount=1`;
  var rateAuth = new Headers();
  rateAuth.append("apikey", process.env.REACT_APP_CURRENCY_API_KEY);
  var requestOptions = {
    method: "GET",
    headers: rateAuth,
  };
  const [weatherData, setWeatherData] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("")
  const [timeStamp, setTimeStamp] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const res2 = await fetch(rateUrl, requestOptions);
      res2.json().then((json) => {
        setRate(json.result)
        setDate(json.date)
        setTimeStamp(json.info.timestamp)
      });
      res.json().then((json) => {
        setDesc(json.weather[0].description);
        setWeatherData(json.main.temp);
        setCity(json.name);
        setFeelsLike(json.main.feels_like);
        const sunriseT = new Date(
          json.sys.sunrise * 1000 + json.timezone * 1000
        );
        const sunsetT = new Date(json.sys.sunset * 1000 + json.timezone * 1000);
        setSunrise(sunriseT.toUTCString().split(" ")[4]);
        setSunset(sunsetT.toUTCString().split(" ")[4]);
      });
    };
    fetchData();
  });

  return (
    <>
      <div style={{ textAlign: "center", backgroundColor: "purple" }}>
        <p style={{ color: "white" }}>
          <b>
            Proudly partnered with{" "}
            <a style={{ color: "white" }} href="http://nyu.edu" target="_blank">
              NYU
            </a>
          </b>
        </p>
      </div>
      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
        <p>
          <b>
            {desc} in {city} with a tempreture of {weatherData} &deg;C
            <br />
            Feels like {feelsLike} &deg;C
          </b>
        </p>
      </div>
      <div style={{ backgroundColor: "cyan", textAlign: "center" }}>
        <p>
          <b>
            Sunrise: {sunrise}
            <br />
            Sunset: {sunset}
          </b>
        </p>
      </div>
      <div style={{ backgroundColor: "blue", textAlign: "center" }}>
        {/* <a href="https://baidu.com" target="_blank" style={{ color: "white" }}>
          百度一下，你就知道
        </a> */}
        <p style={{ color: "ThreeDHighlight" }}>
          <b>1 USD = {rate} CNY as of {new Date(Date(timeStamp)).toLocaleString('en-US', { timeStyle:"short" })} </b>
        </p>
      </div>
    </>
  );
};

export default Weather;
