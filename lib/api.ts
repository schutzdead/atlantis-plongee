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

const TEAM_GRAPHQL_FIELDS = `
  nom
  specialite
  photo {
    url
  }
  courteDescription
`;

const FORMATIONS_GRAPHQL_FIELDS = `
  titre
  prix
  photo {
    url
  }
  courteDescription
  dure
  preRequis
  lien
  niveau
  type
  lienPadi
`;

const SITES_GRAPHQL_FIELDS = `
  titre
  prodonfeur
  niveau
  photo {
    url
  }
  courteDescription
  pointsForts
  horsParc
  catgorie
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

export async function getDecouvertes(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      dcouvertesCollection(limit: 25, preview: ${preview ? "true" : "false"}) {
        items {
          ${DECOUVERTE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return entry?.data?.dcouvertesCollection?.items;

}

export async function getExploration(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      explorationCollection(limit: 25, preview: ${preview ? "true" : "false"}, order: sys_publishedAt_ASC) {
        items {
          ${DECOUVERTE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return entry?.data?.explorationCollection?.items;

}

export async function getTeam(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      equipeCollection(limit: 25, preview: ${preview ? "true" : "false"}) {
        items {
          ${TEAM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return entry?.data?.equipeCollection?.items;

}

export async function getFormations(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      formationsCollection(limit: 50, preview: ${preview ? "true" : "false"}) {
        items {
          ${FORMATIONS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return entry?.data?.formationsCollection?.items;

}

export async function getSites(preview = false): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      sitesCollection(limit: 50, preview: ${preview ? "true" : "false"}) {
        items {
          ${SITES_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );  

  return entry?.data?.sitesCollection?.items;

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

export async function getImagesByIds(ids: string[], preview = false) {
  const idsQuery = ids.map(id => `"${id}"`).join(",")

  const result = await fetchGraphQL(
    `query {
      assetCollection(
        where: { sys: { id_in: [${idsQuery}] } }
        preview: ${preview ? "true" : "false"}
      ) {
        items {
          sys { id }
          title
          url
          width
          height
          contentType
        }
      }
    }`,
    preview
  )

  return result?.data?.assetCollection?.items ?? []
}