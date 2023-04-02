import { useEffect, useState } from "react";

const city = "New York";
const apiUrl = `https://wttr.in/${city}?format=j1`;

export default function Weather() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return (
    <div>
      <h1>Weather</h1>
      {data ? (
        <div>
          <h2>{data.nearest_area[0].areaName[0].value}</h2>
          <p>{data.current_condition[0].weatherDesc[0].value}</p>
          <p>{data.current_condition[0].temp_F}°F</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
