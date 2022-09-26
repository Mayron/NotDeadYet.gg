import styled from "@emotion/styled";

const Question = styled.div`
  padding: 15px 0;

  p:first-child {
    padding-bottom: 10px;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .MuiFormControl-root {
    margin-top: 6px;
  }
`;

export default Question;
