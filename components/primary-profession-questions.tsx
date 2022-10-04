import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import { memo } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { professions } from "../data";
import Question from "./question";

const StyledProfessionHeader = styled.h4`
  font-size: 1.5rem;
  text-transform: none;
  margin-top: 30px;
  margin-bottom: 0;
`;

interface IPrimaryProfessionQuestionsProps {
  characterId: number;
  professionId: number;
}

const PrimaryProfessionQuestions: React.FC<IPrimaryProfessionQuestionsProps> = ({
  characterId,
  professionId,
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ICharacterInfoFormInput>();

  const name = useWatch({
    control,
    name: `characters.${characterId}.professions.${professionId}.name`,
  });

  const characterErrors = errors?.characters && errors.characters[characterId];
  const professionErrors =
    characterErrors &&
    characterErrors.professions &&
    characterErrors.professions[professionId];

  return (
    <>
      <StyledProfessionHeader>
        Primary Profession #{professionId + 1}
      </StyledProfessionHeader>
      <Question horizontal>
        <p>Select your profession: </p>
        <FormControl
          css={css`
            min-width: 250px;
          `}
        >
          <InputLabel id={`profNameLabel${professionId}`}>
            Primary Profession #{professionId + 1}
          </InputLabel>
          <Select
            labelId={`profNameLabel${professionId}`}
            label={`Primary Profession #${professionId + 1}`}
            value={name}
            {...register(`characters.${characterId}.professions.${professionId}.name`, {
              required: "Please choose a profession",
            })}
          >
            {professions.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormHelperText error={!!professionErrors?.name}>
          {professionErrors?.name?.message}
        </FormHelperText>
      </Question>

      <Question horizontal>
        <p>What is the skill level of this profession?:</p>

        <TextField
          css={css`
            width: 80px;

            .MuiInputBase-input.MuiOutlinedInput-input {
              padding: 10px;
            }
          `}
          {...register(`characters.${characterId}.professions.${professionId}.level`, {
            required: true,
            max: {
              value: 450,
              message: "For Wrath Classic, the max skill level is 450.",
            },
            min: {
              value: 1,
              message: "This field is required.",
            },
          })}
          variant="outlined"
          type="number"
        />
        <FormHelperText error={!!professionErrors?.level}>
          {professionErrors?.level?.message}
        </FormHelperText>
      </Question>
    </>
  );
};

export default memo(PrimaryProfessionQuestions);
