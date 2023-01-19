import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import colors from "../styles/colors";
import CommentBox from "./comment-box";
import { fetchJson, markdownToSafeHtml } from "../utils";
import media from "../styles/media-queries";

const CommentOptions = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

  ${media.down("xs")`
    align-items: center;
    
    button, p {
      font-size: 0.75rem;
    }

    p {
      position: relative;
      left: unset;
      transform: unset;
      margin-left: auto;
      margin-right: 15px;
    }
  `};
`;

const SupportsMarkdownText = styled.p`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: ${colors.grey.font};

  a {
    color: ${colors.link.default};
  }
`;

interface IPostCommentFormInput {
  comment: string;
}

const defaultValues: IPostCommentFormInput = {
  comment: "",
};

interface ICommentsListProps {
  postId: string;
}

const CommentsList: React.FC<ICommentsListProps> = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const { data: session } = useSession();
  const userId = session?.user.userId as string;

  useEffect(() => {
    const encodedPostId = encodeURIComponent(postId);
    fetchJson(`/api/comment/${encodedPostId}`, "GET").then(
      (data) => {
        const fetchedComments = data as IComment[];
        setComments(fetchedComments);
      },
      () => {},
    );
  }, [postId]);

  const form = useForm<IPostCommentFormInput>({ defaultValues, mode: "onChange" });
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(async () => {
    const body = getValues().comment;
    const safe = markdownToSafeHtml(body);

    if (safe.length === 0) {
      setError("comment", {
        message:
          "Invalid comment format. Please review the markdown guidelines and try again.",
      });
      return;
    }

    setLoading(true);

    const encodedPostId = encodeURIComponent(postId);
    const encodedUserId = encodeURIComponent(userId);
    const url = `/api/comment/${encodedPostId}/${encodedUserId}`;

    await fetch(url, {
      method: "POST",
      body,
    })
      .then<IComment>((res) => res.json())
      .then((comment) => {
        setComments([...comments, comment]);
        setLoading(false);
        reset();
      });
  }, [comments, getValues, postId, reset, setError, userId]);

  const togglePreview = () => {
    setPreviewing(!previewing);
  };

  const getPreviewPost = () => {
    const { comment } = getValues();
    return comment;
  };

  return (
    <>
      <h6 style={{ marginTop: "40px" }}>Comments ({comments.length})</h6>
      {comments.length > 0 &&
        comments.map((c) => (
          <CommentBox key={c.createdAt} userId={c.userId} createdAt={c.createdAt}>
            {c.body}
          </CommentBox>
        ))}

      <form onSubmit={handleSubmit(onSubmit)}>
        {previewing ? (
          <CommentBox editor>{getPreviewPost()}</CommentBox>
        ) : (
          <TextField
            {...register(`comment`, { required: true })}
            label="Post a new comment"
            error={!!errors?.comment}
            helperText={errors?.comment?.message}
            fullWidth
            multiline
            minRows={5}
            maxRows={20}
            sx={{ backgroundColor: colors.white }}
          />
        )}

        <CommentOptions>
          <Button onClick={togglePreview}>
            {previewing ? "Show Editor" : "Preview Post"}
          </Button>
          <SupportsMarkdownText>
            Supports{" "}
            <a
              href="https://www.markdownguide.org/basic-syntax"
              target="_blank"
              rel="noreferrer"
            >
              markdown
            </a>
          </SupportsMarkdownText>

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Please wait..." : "Post"}
          </Button>
        </CommentOptions>
      </form>
    </>
  );
};

export default CommentsList;
