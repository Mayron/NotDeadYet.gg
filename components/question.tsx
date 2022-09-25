import styled from "@emotion/styled";

interface IQuestionProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledQuestion = styled.div`
  margin: 30px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  p {
    padding: 10px 0;

    &.MuiFormHelperText-root {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;

const Question: React.FC<IQuestionProps> = ({ children }) => (
  <StyledQuestion>{children}</StyledQuestion>
);

export default Question;
