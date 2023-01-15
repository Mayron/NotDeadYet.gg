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

export interface ILootTabContentful {
  data: {
    lootTabCollection: {
      items: {
        index: number;
        label: string;
        section1: string;
        instructions1: string;
        section2: string;
        instructions2: string;
      }[];
    };
  };
}

export const getLootTabContent = async (): Promise<ILootTabContentful> => {
  const query = `#graphql    
    query {
      lootTabCollection {
        items {
          index
          label
          section1
          instructions1
          section2
          instructions2
        }
      }
    }
  `;

  const response = await fetchGraphQL<ILootTabContentful>(query);
  return response;
};

export interface IContentfulPostsResponse {
  data: {
    postCollection: {
      items: ContentfulPost[];
    };
  };
}

export const getContentfulPosts: (
  publicOnly: boolean,
) => Promise<ContentfulPost[]> = async (publicOnly) => {
  const condition = publicOnly ? ", where: {public: true}" : "";

  const query = `#graphql    
    query {
      postCollection(order: sys_publishedAt_DESC${condition}) {
        items {
          title
          excerpt
          sys {
            publishedAt
            id
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

  const response = await fetchGraphQL<IContentfulPostsResponse>(query);
  return response.data.postCollection.items;
};

export interface IContentfulPostResponse {
  data: {
    post: ContentfulPost;
  };
}

export const getContentfulPost: (postId: string) => Promise<ContentfulPost> = async (
  postId,
) => {
  const query = `#graphql    
    query {
      post(id: "${postId}") {
        title
        body
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
  `;

  const response = await fetchGraphQL<IContentfulPostResponse>(query);
  return response.data.post;
};

interface IResourcesContentfulResponse {
  data: {
    resources: {
      content: string;
    };
  };
}
export const getResourcesContent = async (): Promise<string> => {
  const query = `#graphql    
    query {
      resources(id: "4U4CAcYVMz5x4gi960IBiS") {
        content
      }
    }
  `;

  const response = await fetchGraphQL<IResourcesContentfulResponse>(query);
  return response.data.resources.content;
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
