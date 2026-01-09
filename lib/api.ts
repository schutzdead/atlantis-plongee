const DECOUVERTE_GRAPHQL_FIELDS = `
  titre
  prix
  photo {
    url
  }
  courteDescription
  dure
  preRequis
  lien
`;

const HOMEPAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  content
  titre
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts", "homepage"], revalidate: 0 },
    },
  ).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

export async function getDecouvertes(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      dcouvertesCollection(limit: 10, preview: ${preview ? "true" : "false"}) {
        items {
          ${DECOUVERTE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  console.log(entry);
  
  return entry?.data?.dcouvertesCollection?.items;

}

export async function getHomepageContent(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      pagesCollection(limit: 1, preview: ${preview ? "true" : "false"}) {
        items {
          ${HOMEPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return entry?.data?.pagesCollection?.items[0].content;
}

export async function getPageContent(pageSlug: string, preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      pagesCollection(limit: 20, preview: ${preview ? "true" : "false"}, where: { titre: "${pageSlug}" }) {
        items {
          ${HOMEPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  
  return entry?.data?.pagesCollection?.items[0]?.content;
}