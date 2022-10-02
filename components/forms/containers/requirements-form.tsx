/* eslint-disable react/jsx-props-no-spreading */
import {
  Checkbox,
  css,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import BlizzardButton from "../../blizzard-button";
import Question from "../../question";
import WhitePanel from "../../white-panel";

const defaultValues: IRequirementsFormInput = {
  expectations: false, // default value not visually showing
  availability: "",
  partialAvailabilityReason: "",
};

const RequirementsForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRequirementsFormInput>({ defaultValues, mode: "onChange" });

  const expectations = useWatch({ control, name: "expectations" });
  const availability = useWatch({ control, name: "availability" });

  const storage = typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist("application", { watch, setValue, storage });

  const onSubmit = useCallback(async () => {
    setLoading(true);
    await router.push("/apply/character-info");
  }, [router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WhitePanel>
        <Question>
          <p>
            Please confirm that you have read and understood the guild&apos;s
            expectations:
          </p>

          <FormControlLabel
            label="I have read and understood the guild's expectations."
            {...register("expectations", {
              required:
                "Please confirm that you understand our expectations before continuing",
            })}
            control={<Checkbox checked={expectations} />}
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
                  control={<Radio />}
                />
                <FormControlLabel value="partial" label="Other" control={<Radio />} />
              </RadioGroup>
            )}
          />

          <FormHelperText error={!!errors?.availability}>
            {errors?.availability?.message}
          </FormHelperText>

          {availability === "partial" && (
            <TextField
              {...register("partialAvailabilityReason", {
                required: true,
                minLength: { message: "Minimum characters allowed is 50", value: 50 },
                maxLength: { message: "Maximum characters allowed is 500", value: 500 },
              })}
              fullWidth
              label="Please explain why this might be a problem:"
              variant="outlined"
              error={!!errors?.partialAvailabilityReason}
              helperText={errors?.partialAvailabilityReason?.message}
              multiline
              maxRows={5}
              minRows={3}
            />
          )}
        </Question>
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

export default RequirementsForm;
