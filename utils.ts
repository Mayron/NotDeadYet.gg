// import slugify from "slugify";
import { Session } from "next-auth";
import { marked } from "marked";
import { sanitize } from "dompurify";

// export const getSlug: (value: string) => string = (value) =>
//   slugify(value, { lower: true, remove: /[*+~.()'"!?:@]/g });

export const getUsername = (session: Session | null) => {
  if (!session?.user) {
    return undefined;
  }

  let { username } = session.user;

  if (!username && session.user.name) {
    username = session.user.name;
  }

  if (username && username.includes("#")) {
    [username] = username.split("#");
  }

  return username;
};

const markdownOptions: DOMPurify.Config = {
  ALLOWED_ATTR: ["href", "src", "alt"],
  ALLOWED_TAGS: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "p",
    "del",
    "a",
    "em",
    "i",
    "b",
    "strong",
    "blockquote",
    "code",
    "pre",
    "hr",
    "img",
    "alt",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "mark",
  ],
};

export const markdownToSafeHtml = (userInput: string) => {
  const html = sanitize(marked.parse(userInput), markdownOptions) as string;
  return html.trim();
};

export const fetchJson = async (url: string, method: string) => {
  const response = await fetch(url, { method });
  return response.json();
};
