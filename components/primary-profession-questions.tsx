import { css } from "@emotion/react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { memo } from "react";
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrorsImpl,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { professions } from "../data";
import Question from "./question";

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

  const maxLevel = useWatch({
    control,
    name: `characters.${characterId}.professions.${professionId}.maxLevel`,
  });

  const characterErrors = errors?.characters && errors.characters[characterId];
  const professionErrors =
    characterErrors &&
    characterErrors.professions &&
    characterErrors.professions[professionId];

  return (
    <>
      <Question horizontal>
        <p>Primary Profession #{professionId + 1}: </p>
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

      <Question>
        <p>Is the skill level of this profession maxed out for the current expansion?</p>
        <Controller
          name={`characters.${characterId}.professions.${professionId}.maxLevel`}
          control={control}
          rules={{ required: "Please select one of these options" }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="yes" label="Yes" control={<Radio />} />
              <FormControlLabel value="no" label="No" control={<Radio />} />
            </RadioGroup>
          )}
        />

        <FormHelperText error={!!professionErrors?.maxLevel}>
          {professionErrors?.maxLevel?.message}
        </FormHelperText>

        {maxLevel === "no" && (
          <>
            <p
              css={css`
                margin-bottom: 10px;
                margin-top: 10px;
              `}
            >
              What is your character&apos;s current skill level for this profession?
              <br />
              Can you max out this profession before raiding with us? If not, why?
            </p>
            <TextField
              {...register(
                `characters.${characterId}.professions.${professionId}.notMaxedReason`,
                {
                  required: true,
                  minLength: { message: "Minimum characters allowed is 20", value: 20 },
                  maxLength: { message: "Maximum characters allowed is 500", value: 500 },
                },
              )}
              fullWidth
              label="Please describe the situation here"
              error={!!professionErrors?.notMaxedReason}
              helperText={professionErrors?.notMaxedReason?.message}
              multiline
              maxRows={5}
              minRows={3}
              variant="outlined"
            />
          </>
        )}
      </Question>
    </>
  );
};

export default memo(PrimaryProfessionQuestions);
