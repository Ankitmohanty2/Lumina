async function getQuote() {
  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    throw new Error("API_NINJAS_KEY is not set");
  }

  const res = await fetch(
    'https://api.api-ninjas.com/v2/randomquotes?categories=education,inspirational',
    {
      headers: {
        'X-Api-Key': apiKey,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Ninjas error ${res.status}: ${text}`);
  }

  return res.json();
}
