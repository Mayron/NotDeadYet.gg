import styled from "@emotion/styled";
import colors from "../styles/colors";

interface ICharacterDetailsProps {
  character: ICharacterInfo;
  index: number;
}

const StyledDetails = styled.dl`
  border: 1px solid ${colors.grey.light};
  border-radius: 4px;
  background-color: ${colors.grey.lightBg};
  padding: 15px;
  display: flex;
  margin-bottom: 15px;

  &:last-of-type {
    margin-bottom: 0;
  }

  li {
    flex: 1;
  }
`;

const StyledContainer = styled.div`
  h4 {
    margin-bottom: 0;
    margin-top: 30px;
    font-size: 1.4rem;
  }
`;

const CharacterDetails: React.FC<ICharacterDetailsProps> = ({ character, index }) => {
  const wowClassName = character.class.replace(/\s/g, "-").toLowerCase();

  return (
    <StyledContainer>
      <h4>{index > 0 ? `Alt #${index}` : "Main Character"}</h4>

      <StyledDetails>
        <li>
          <dt>Character Name</dt>
          <dd className={wowClassName}>{character.name}</dd>
        </li>

        <li>
          <dt>Main-Spec</dt>
          <dd>{character.mainSpec}</dd>
        </li>

        <li>
          <dt>Off-Spec</dt>
          <dd>{character.offSpec}</dd>
        </li>
      </StyledDetails>

      <StyledDetails>
        <li>
          <dt>Primary Profession #1</dt>
          <dd>{`${character.professions[0].name} (${character.professions[0].level})`}</dd>
        </li>

        <li>
          <dt>Primary Profession #2</dt>
          <dd>{`${character.professions[1].name} (${character.professions[1].level})`}</dd>
        </li>
      </StyledDetails>
    </StyledContainer>
  );
};

export default CharacterDetails;
