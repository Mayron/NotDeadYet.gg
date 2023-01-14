declare type Rule = {
  title: string;
  content: string;
};

declare type ContentfulPost = {
  title: string;
  author: Author;
  excerpt: string;
  body: string;
  sys: {
    publishedAt: string;
    id: string;
  };
};

declare type Author = {
  name: string;
  bio: string;
  profilePicture: ProfilePicture;
};

declare type ProfilePicture = {
  title: string;
  url: string;
  width: number;
  height: number;
};
