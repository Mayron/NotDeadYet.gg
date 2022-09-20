declare type Rule = {
  title: string;
  content: string;
};

declare interface IRulesResponse<T> {
  data: {
    rulesCollection: {
      items: T[];
    };
  };
}
