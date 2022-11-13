import styled from "@emotion/styled";
import media from "../styles/media-queries";

interface IPanelProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledPanel = styled.div`
  display: flex;
  padding: 15px;
  border: 1px solid #000000;
  margin: 50px 0;
  background: linear-gradient(45deg, #2d3240, #21242d);
  color: white;
  box-shadow: inset 0px 0px 15px rgb(0 0 0 / 50%), 0px 2px 6px rgb(0 0 0 / 80%);

  svg {
    margin-right: 10px;
  }

  button {
    display: flex;
    align-items: center;
    border: 1px solid #005aae;
    background: linear-gradient(45deg, #00407c, #005db3);
    border-radius: 4px;
    color: white;
    box-shadow: 0 0 10px rgb(0 0 0 / 50%);
    font-size: 1.125rem;
    white-space: nowrap;
    padding: 4px 10px;

    &:hover {
      background: none;
      background-color: #148eff;

      path {
        fill: #262d4a;
      }
    }
  }

  p {
    padding-bottom: 0;
    padding-right: 20px;
  }

  ${media.down("sm")`
    flex-direction: column;
    align-items: center;
    margin: 20px 0 0 0;

    p {
      padding-bottom: 20px;
      padding-right: 0;
    }

    button {
      padding: 15px 30px;
    }
  
  `};
`;

const BattleNetSignInPanel: React.FC<IPanelProps> = ({ children }) => (
  <StyledPanel>{children}</StyledPanel>
);

export default BattleNetSignInPanel;
