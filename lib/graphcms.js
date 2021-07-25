async function fetchAPI(query) {
  const res = await fetch(
    "https://api-eu-central-1.graphcms.com/v2/ckrjab9ol1chk01wef8mb3bc5/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllTracks() {
  const data = await fetchAPI(`
  query MyQuery {
    tracks {
      id
      slug
      title
      tags
      file {
        url
      }
    }
  }  
  `);
  return data;
}
