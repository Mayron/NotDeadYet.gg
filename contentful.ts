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

interface IRulesResponse {
  data: {
    rulesCollection: {
      items: Rule[];
    };
  };
}

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

  const response = await fetchGraphQL<IRulesResponse>(query);
  return response.data.rulesCollection.items;
};

interface IGuildSummaryResponse {
  data: {
    guildSummary: {
      text: string;
    };
  };
}

export const getGuildSummary = async (): Promise<string> => {
  const query = `#graphql    
    query {
      guildSummary(id: "5eWzQ0i23PV80UYgKXfgZr") {
        text 
      }
    }
  `;

  const response = await fetchGraphQL<IGuildSummaryResponse>(query);
  return response.data.guildSummary.text;
};

interface IDashboardContentResponse {
  data: {
    dashboard: {
      text: string;
    };
  };
}

export const getDashboardContent = async (
  canViewLootStandings?: boolean,
): Promise<string> => {
  const id = canViewLootStandings ? "48oyrMdaXNIeeFVrVFdnyD" : "31A1AXAWDqKrZO02tkZFPw";

  const query = `#graphql    
    query {
      dashboard(id: "${id}") {
        text 
      }
    }
  `;

  const response = await fetchGraphQL<IDashboardContentResponse>(query);
  return response.data.dashboard.text;
};

interface INewsResponse {
  data: {
    newsCollection: {
      items: NewsArticle[];
    };
  };
}

export const getAllNews = async (): Promise<NewsArticle[]> => {
  const query = `#graphql    
    query {
      newsCollection(order: sys_publishedAt_DESC) {
        items {
          title
          excerpt
          sys {
            publishedAt
          }
          author {
            name
            bio
            profilePicture {
              title
              url
              width
              height
            }
          }          
        }
      }
    }
  `;

  const response = await fetchGraphQL<INewsResponse>(query);
  return response.data.newsCollection.items;
};

interface IApplyInfoResponse {
  data: {
    applyInfo: {
      content: string;
    };
  };
}

export const getApplyInfo = async (): Promise<string> => {
  const query = `#graphql    
    query {
      applyInfo(id: "7a7LjQezrsdybLN5VTboM1") {
        content
      }
    }
  `;

  const response = await fetchGraphQL<IApplyInfoResponse>(query);
  return response.data.applyInfo.content;
};
