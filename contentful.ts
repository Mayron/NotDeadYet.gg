const fetchGraphQL = async <T>(query: string): Promise<T> => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID || "";
  const token = process.env.CONTENTFUL_ACCESS_TOKEN || "";

  const result = fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json() as Promise<T>);

  return result;
};

export const getAllRules = async (): Promise<Rule[]> => {
  const query = `#graphql    
    query {
      rulesCollection(order: order_ASC) {
        items {
          title
          content
        }
      }
    }
  `;

  const response = await fetchGraphQL<IRulesResponse<Rule>>(query);
  return response.data.rulesCollection.items;
};
