export default async function (req, res) {
  const city = req.query.city;
  const apiUrl = `https://wttr.in/${city}?format=j1`;
  const resp = await fetch(apiUrl);
  const data = await resp.json();
  return res.status(200).json(data);
}
