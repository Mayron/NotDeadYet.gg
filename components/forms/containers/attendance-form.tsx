/* eslint-disable react/jsx-props-no-spreading */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

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
  const [partialAvailabilityShown, setPartialAvailabilityShown] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues });

  const onSubmit = (data: IFormInput) => console.log(data);

  const handlePartialAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setPartialAvailabilityShown(checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <p>
          Please confirm that you have read and understood the guild&apos;s expectations:
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

        <p>
          Are you able to consistently raid 3 times per week for progression, and 2 times
          per a week for farm content between 19:30-23:00 (server time)?
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

        {partialAvailabilityShown && (
          <TextField
            {...register("reason", {
              required: true,
              minLength: { message: "Minimum characters allowed is 50", value: 50 },
              maxLength: { message: "Maximum characters allowed is 500", value: 500 },
            })}
            label="Please explain why this might be a problem:"
            variant="standard"
            error={!!errors?.reason}
            helperText={errors?.reason?.message}
            multiline
            maxRows={5}
          />
        )}

        <input type="submit" value="Continue" />
      </FormControl>
    </form>
  );
};

// <form onSubmit={handleSubmit(onSubmit)}>
//   <p>Please confirm that you have read and understood the guild&apos;s expectations:</p>
//   <label htmlFor="expectations">
//     <p>{errors.expectations?.message}</p>
//     {/* <input
//               id="expectations"
//               type="checkbox"
//               {...register("expectations")}
//               value="true"
//             /> */}
//     <span>I have read and understood the guild&apos;s expectations.</span>
//   </label>

//   <p>
//     Are you able to consistently raid 3 times per week for progression, and 2 times per a
//     week for farm content between 19:30-23:00 (server time)?
//   </p>
//   {/* <label htmlFor="expectations">
//             <p>{errors.fullAvailability?.message}</p>
//             <input type="checkbox" {...register("fullAvailability")} value="true" />
//             <span>
//               Yes, I can consistently show high attendance for the above raid times.
//             </span>

//             <p>If not, please explain in more detail your availability for raids:</p>
//             <p>{errors.partialAvailability?.message}</p>
//             <textarea {...register("partialAvailability")} />
//           </label> */}

// const schema = yup
//   .object({
//     expectations: yup.boolean().required("Please confirm this before continuing"),
//     fullAvailability: yup.boolean().when("partialAvailability", {
//       is: (val: string) => yup.string().min(5).isValid(val),
//       then: (s) => s.required(),
//     }),
//     partialAvailability: yup.string().when("attenance", {
//       is: false,
//       then: (s) => s.min(5).required(),
//     }),
//   })
//   .required();

export default AttendanceForm;
