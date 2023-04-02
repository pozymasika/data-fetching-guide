import { createConnection, getCities, getCityBySlug } from "@/database";

export async function getStaticParams() {
  const db = await createConnection();
  const cities = await getCities(db);
  return cities.map((city) => {
    return {
      city: city.slug,
    };
  });
}

export async function getData({ params }) {
  const citySlug = params.city;
  const db = await createConnection();
  const city = await getCityBySlug(db, citySlug);
  const apiUrl = `https://wttr.in/${city.name}?format=j1`;
  console.log("api", apiUrl);
  const res = await fetch(apiUrl);
  return {
    data: await res.json(),
    city,
  };
}

export default async function CityWeather({ params }) {
  const { data, city } = await getData({ params });
  return (
    <div>
      <h1>Weather for {city.name}</h1>
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
