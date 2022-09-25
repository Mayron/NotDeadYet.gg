import styled from "@emotion/styled";
import colors from "../styles/colors";

interface IWhitePanelProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledWhitePanel = styled.div`
  background-color: ${colors.white};
  padding: 25px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 20%);
  margin-bottom: 30px;

  & > header {
    padding-top: 10px;
  }
`;

const WhitePanel: React.FC<IWhitePanelProps> = ({ children }) => (
  <StyledWhitePanel>{children}</StyledWhitePanel>
);

export default WhitePanel;
