import { createConnection, getCities, getCityBySlug } from "@/database";

export async function getStaticPaths() {
  const db = await createConnection();
  const cities = await getCities(db);
  return {
    paths: cities.map((city) => {
      return {
        params: {
          city: city.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const citySlug = params.city;
  const db = await createConnection();
  const city = await getCityBySlug(db, citySlug);
  const apiUrl = `https://wttr.in/${city.name}?format=j1`;
  console.log("api", apiUrl);
  const res = await fetch(apiUrl);
  return {
    props: {
      data: await res.json(),
      city,
    },
  };
}

export default function CityWeather({ data, city }) {
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
