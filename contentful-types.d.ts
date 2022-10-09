declare type Rule = {
  title: string;
  content: string;
};

declare type NewsArticle = {
  title: string;
  body: string;
  excerpt: string;
  author: Author;
  sys: {
    publishedAt: string;
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
