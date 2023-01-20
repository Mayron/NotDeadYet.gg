import { css } from "@emotion/react";
import styled from "@emotion/styled";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import colors from "../styles/colors";
import vars from "../styles/vars";
import { fetchJson, getUsername, markdownToSafeHtml } from "../utils";

interface IStyledCommentBoxProps {
  editor: boolean;
}

const StyledCommentBox = styled.div<IStyledCommentBoxProps>(
  ({ editor }) => css`
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 1rem 0.8rem 0;
    margin-bottom: ${editor ? "0" : "15px"};
    background-color: ${colors.white};
    min-height: ${editor ? "163px" : "auto"};
  `,
);

const StyledCommentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 0.95rem;

  .username {
    font-weight: ${vars.font.standard.weights.medium};
    margin-right: 20px;
  }

  .info {
    color: ${colors.grey.font};
    font-size: 0.95rem;
  }
`;

const styledMarkdownContent = css`
  a {
    color: ${colors.link.default};

    &:hover {
      color: ${colors.link.hover};
      text-decoration: underline;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: left;
    text-transform: none;
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p,
  pre,
  blockquote,
  ul,
  ol {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin-left: 1.8rem;

    ul,
    ol {
      margin-bottom: 0;
    }
  }

  pre,
  blockquote {
    width: 100%;
    background-color: #ececec;
    border-radius: 2px;
  }

  pre {
    padding: 6px 8px;
  }

  blockquote {
    border-left: 10px solid #ccc;
    padding: 1rem 10px 0.1rem 10px;
  }

  code {
    background-color: #ececec;
    padding: 2px 4px;
    border-radius: 2px;
  }

  table {
    border: 1px solid #dee2e6;
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #dee2e6;
      padding: 0.75rem;
    }

    th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
      font-weight: ${vars.font.standard.weights.medium};
    }

    td {
      vertical-align: center;
    }
  }
`;

interface ICommentBoxProps {
  userId?: string;
  createdAt?: string;
  children: string;
  editor?: boolean;
}

const CommentBox: React.FC<ICommentBoxProps> = ({
  userId,
  createdAt,
  children,
  editor,
}) => {
  const [username, setUsername] = useState("...loading");
  const { data: session } = useSession();

  useEffect(() => {
    if (userId) {
      fetchJson(`/api/user/name/${userId}`, "GET").then(
        (data) => {
          const fetchedUsername = data as string;
          setUsername(fetchedUsername);
        },
        () => {},
      );
    } else {
      const yourUsername = getUsername(session);
      setUsername(yourUsername || userId || "You");
    }
  }, [session, userId]);

  createdAt = createdAt || new Date().toUTCString();
  const time = moment(createdAt).fromNow();
  const html = markdownToSafeHtml(children);

  return (
    <StyledCommentBox editor={editor || false}>
      <StyledCommentHeader>
        <p>
          Posted by <span className="username">{username}</span>
        </p>
        <span className="info">{time}</span>
      </StyledCommentHeader>
      <div css={styledMarkdownContent} dangerouslySetInnerHTML={{ __html: html }}></div>
    </StyledCommentBox>
  );
};

export default CommentBox;
