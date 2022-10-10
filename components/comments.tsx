import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { marked } from "marked";
import { sanitize } from "dompurify";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import colors from "../styles/colors";

const CommentOptions = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

const SupportsMarkdownText = styled.p`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: ${colors.grey.dark};

  a {
    color: ${colors.link.default};
  }
`;

const PreviewBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 16.5px 14px;
  background-color: ${colors.white};
  min-height: 163px;
`;

interface ICommentsProps {
  data?: string[];
}

interface IPostCommentFormInput {
  comment: string;
}

const defaultValues: IPostCommentFormInput = {
  comment: "",
};

const Comments: React.FC<ICommentsProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const form = useForm<IPostCommentFormInput>({ defaultValues, mode: "onChange" });
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(async () => {
    setLoading(true);
    // await router.push("/apply");
  }, []);

  const togglePreview = () => {
    setPreviewing(!previewing);
  };

  const getPreviewPost = () => {
    const { comment } = getValues();
    const html = sanitize(marked.parse(comment));
    return html;
  };

  return (
    <>
      <h4>Comments</h4>
      {data && data.length > 0 && <div>{data}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {previewing ? (
          <PreviewBox dangerouslySetInnerHTML={{ __html: getPreviewPost() }} />
        ) : (
          <TextField
            {...register(`comment`, { required: true })}
            label="Post a new comment"
            error={!!errors?.comment}
            helperText={errors?.comment?.message}
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
            sx={{ backgroundColor: "#fff" }}
          />
        )}

        <CommentOptions>
          <Button onClick={togglePreview}>
            {previewing ? "Show Editor" : "Preview Post"}
          </Button>
          <SupportsMarkdownText>
            Supports{" "}
            <a
              href="https://www.markdownguide.org/cheat-sheet"
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

export default Comments;
