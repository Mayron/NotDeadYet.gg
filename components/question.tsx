import styled from "@emotion/styled";

interface IQuestionProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledQuestion = styled.div`
  padding: 15px 0;

  p:first-child {
    padding-bottom: 6px;
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

const Question: React.FC<IQuestionProps> = ({ children }) => (
  <StyledQuestion>{children}</StyledQuestion>
);

export default Question;
