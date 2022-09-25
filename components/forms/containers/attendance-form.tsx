/* eslint-disable react/jsx-props-no-spreading */
import {
  Checkbox,
  css,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import BlizzardButton from "../../blizzard-button";
import Question from "../../question";
import WhitePanel from "../../white-panel";

interface IFormInput {
  expectations: boolean;
  availability: "full" | "partial" | "";
  reason: string;
}

const defaultValues: IFormInput = {
  expectations: false,
  availability: "",
  reason: "",
};

const AttendanceForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [reasonTextFieldShown, setReasonTextFieldShown] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues });

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    console.log(data);
    await router.push("/apply/character-info");
  };

  const handlePartialAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.currentTarget;
    setReasonTextFieldShown(value === "partial");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WhitePanel>
        <FormControl>
          <Question>
            <p>
              Please confirm that you have read and understood the guild&apos;s
              expectations:
            </p>

            <FormControlLabel
              label="I have read and understood the guild's expectations."
              control={
                <Checkbox
                  {...register("expectations", {
                    required:
                      "Please confirm that you understand our expectations before continuing",
                  })}
                />
              }
            />
            <FormHelperText error={!!errors?.expectations}>
              {errors?.expectations?.message}
            </FormHelperText>
          </Question>

          <Question>
            <p>
              Are you able to consistently raid 3 times per week for progression, and 2
              times per a week for farm content between 19:30-23:00 (server time)?
            </p>

            <Controller
              name="availability"
              control={control}
              rules={{ required: "Please select one of these options" }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="full"
                    label="Yes, I can consistently show high attendance for the above raid times."
                    control={<Radio onChange={handlePartialAvailabilityChange} />}
                  />
                  <FormControlLabel
                    value="partial"
                    label="Other"
                    control={<Radio onChange={handlePartialAvailabilityChange} />}
                  />
                </RadioGroup>
              )}
            />

            <FormHelperText error={!!errors?.availability}>
              {errors?.availability?.message}
            </FormHelperText>

            {reasonTextFieldShown && (
              <TextField
                {...register("reason", {
                  required: true,
                  minLength: { message: "Minimum characters allowed is 50", value: 50 },
                  maxLength: { message: "Maximum characters allowed is 500", value: 500 },
                })}
                fullWidth
                label="Please explain why this might be a problem:"
                variant="standard"
                error={!!errors?.reason}
                helperText={errors?.reason?.message}
                multiline
                maxRows={5}
              />
            )}
          </Question>
        </FormControl>
      </WhitePanel>

      <footer
        css={css`
          margin: 30px auto 0 auto;
          display: flex;
          justify-content: center;
        `}
      >
        <BlizzardButton text="Continue" submit loading={loading} />
      </footer>
    </form>
  );
};

export default AttendanceForm;
