import { css } from "@emotion/react";
import { Card, CardHeader, CardContent, CardActions, Button } from "@mui/material";
import { marked } from "marked";
import Moment from "react-moment";
import Image from "next/image";
import { contentfulStyles } from "../styles/fonts";
import media from "../styles/media-queries";

interface IPostThumbnailProps {
  title: string;
  path: string;
  body?: string;
  excerpt?: string;
  author: Author;
  publishedAt: string;
}

const PostThumbnail: React.FC<IPostThumbnailProps> = ({
  author,
  path,
  body,
  excerpt,
  title,
  publishedAt,
}) => (
  <Card
    css={css`
      margin: 15px;
      margin-top: 0;

      ${body &&
      css`
        margin: 0;
        border: none;
        border-radius: 0;
        box-shadow: none;
      `};

      &:last-of-type {
        margin-bottom: 0;
      }

      ${excerpt &&
      media.down("sm")`
        margin-left: 8px;
        margin-right: 8px;
        margin-bottom: 10px;
      `};
    `}
  >
    <CardHeader
      css={css`
        padding: 15px;

        ${media.down("xs")`
          padding: 10px;
        `};
      `}
      avatar={
        <Image
          src={author.profilePicture.url}
          width={50}
          height={50}
          alt={author.profilePicture.title}
          css={css`
            border-radius: 4px;
          `}
        />
      }
      title={title}
      subheader={
        <p
          css={css`
            font-size: 0.75rem;
            line-height: 1;
          `}
        >
          Posted by <b>{author.name}</b>
          {` `}
          <Moment fromNow>{publishedAt}</Moment>
        </p>
      }
      action={
        body && (
          <CardActions disableSpacing>
            <Button
              size="small"
              href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}${path}`}
            >
              Go Back
            </Button>
          </CardActions>
        )
      }
    />
    <CardContent sx={{ padding: "10px 0" }}>
      <article
        css={contentfulStyles}
        dangerouslySetInnerHTML={{ __html: marked.parse(body || excerpt || "") }}
      ></article>
    </CardContent>
    {body ? (
      <CardActions disableSpacing>
        <Button size="small" href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}${path}`}>
          Go Back
        </Button>
      </CardActions>
    ) : (
      <CardActions disableSpacing>
        <Button size="small" href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}${path}`}>
          Read More
        </Button>
      </CardActions>
    )}
  </Card>
);

export default PostThumbnail;
