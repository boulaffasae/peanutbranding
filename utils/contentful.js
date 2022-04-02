async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/vi8zeey66qqt`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer yKFiHgAjiaYeW1t-5wluJKkEU1yqom8ttJqwzNA7Wew`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

async function fetchEntries() {
  const entries = await fetchGraphQL(
    `query {
      projectCollection {
        items {
          hex
          slug
          title
          subtitle
          coverCollection {
            items {
              url
              description
              height
              width
            }
          }
        }
      }
    }`
  );

  return entries;
}

async function fetchEntrie(slug) {
  const entries = await fetchGraphQL(
    `query {
      projectCollection (where: { slug: "${slug}"}) {
        items {
          hex
          title
          subtitle
          body {
            json
          }
          coverCollection {
            items {
              url
              description
              height
              width
            }
          }
        }
      }
    }`
  );

  return entries;
}

export { fetchEntries, fetchEntrie };
