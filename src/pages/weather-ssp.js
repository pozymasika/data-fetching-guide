import { getCities, createConnection } from "@/database";

export async function getServerSideProps() {
  const db = await createConnection();
  const cities = await getCities(db);
  return {
    props: {
      cities,
    },
  };
}

export default function Weather({ cities }) {
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
