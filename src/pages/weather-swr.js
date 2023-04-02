import useSWR from "swr";

const city = "New York";
const apiUrl = `/api/weather?city=${city}`;

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Weather() {
  const { data, isLoading, error } = useSWR(apiUrl, fetcher);
  return (
    <div>
      <h1>Weather</h1>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <h2>{data.nearest_area[0].areaName[0].value}</h2>
          <p>{data.current_condition[0].weatherDesc[0].value}</p>
          <p>{data.current_condition[0].temp_F}°F</p>
        </div>
      )}
    </div>
  );
}
