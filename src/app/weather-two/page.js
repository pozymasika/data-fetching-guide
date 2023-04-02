import { getCities, createConnection } from "@/database";

async function getData() {
  const db = await createConnection();
  const cities = await getCities(db);
  return cities;
}

export default async function Weather() {
  const cities = await getData();
  return (
    <div>
      <h1>Weather</h1>
      <ul>
        {cities.map((city) => {
          return (
            <li key={city.id}>
              <a href={`/weather/${city.slug}`}>{city.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
