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
import { useState } from "react";
import { Controller, UseFormRegister, Control, FieldErrorsImpl } from "react-hook-form";
import { professions } from "../data";
import Question from "./question";

interface IPrimaryProfessionQuestionsProps {
  register: UseFormRegister<ICharacterInfoFormInput>;
  control: Control<ICharacterInfoFormInput>;
  errors: FieldErrorsImpl<ICharacterInfoFormInput>;
  id: number;
}

const PrimaryProfessionQuestions: React.FC<IPrimaryProfessionQuestionsProps> = ({
  register,
  control,
  errors,
  id,
}) => {
  const [reasonShown, setReasonShown] = useState(false);

  const primaryErrors =
    id === 1
      ? {
          profession: errors?.primaryProfession1,
          maxLevel: errors?.primaryMaxLevel1,
          noMaxReason: errors?.primaryNotMaxedReason1,
        }
      : {
          profession: errors?.primaryProfession2,
          maxLevel: errors?.primaryMaxLevel2,
          noMaxReason: errors?.primaryNotMaxedReason2,
        };

  const handleMaxLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setReasonShown(value === "no");
  };

  return (
    <>
      <Question>
        <FormControl
          css={css`
            min-width: 300px;
          `}
        >
          <InputLabel id={`primaryProf${id}`}>Primary Profession #{id}</InputLabel>
          <Select
            labelId={`primaryProf${id}`}
            label={`Primary Profession #${id}`}
            {...register(id === 1 ? "primaryProfession1" : "primaryProfession2", {
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

        <FormHelperText error={!!primaryErrors.profession}>
          {primaryErrors.profession?.message}
        </FormHelperText>
      </Question>

      <Question>
        <p>Is the skill level of this profession maxed out for the current expansion?</p>
        <Controller
          name={id === 1 ? "primaryMaxLevel1" : "primaryMaxLevel2"}
          control={control}
          rules={{ required: "Please select one of these options" }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="yes"
                label="Yes"
                control={<Radio onChange={handleMaxLevelChange} />}
              />
              <FormControlLabel
                value="no"
                label="No"
                control={<Radio onChange={handleMaxLevelChange} />}
              />
            </RadioGroup>
          )}
        />

        <FormHelperText error={!!primaryErrors.maxLevel}>
          {primaryErrors.maxLevel?.message}
        </FormHelperText>

        {reasonShown && (
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
                id === 1 ? "primaryNotMaxedReason1" : "primaryNotMaxedReason2",
                {
                  required: true,
                  minLength: { message: "Minimum characters allowed is 20", value: 20 },
                  maxLength: { message: "Maximum characters allowed is 500", value: 500 },
                },
              )}
              fullWidth
              label="Please describe the situation here"
              error={!!primaryErrors.noMaxReason}
              helperText={primaryErrors.noMaxReason?.message}
              multiline
              maxRows={5}
            />
          </>
        )}
      </Question>
    </>
  );
};

export default PrimaryProfessionQuestions;
