import {
  css,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { storeApplication } from "../../../firebase";
import BlizzardButton from "../../blizzard-button";
import Question from "../../question";
import WhitePanel from "../../white-panel";

const defaultValues: IAboutYouFormInput = {
  canTalk: "",
  cannotTalkReason: "",

  bringConsumes: "",
  cannotBringConsumesReason: "",

  wowExperience: "",
  describeSelf: "",

  discordId: "",
  vouch: "",
  anythingElse: "",
};

interface IAboutYouFormProps {
  username: string;
}

const AboutYouForm: React.FC<IAboutYouFormProps> = ({ username }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IAboutYouFormInput>({ defaultValues, mode: "onChange" });

  const storage = typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist("application", { watch, setValue, storage });

  const canTalk = useWatch({ control, name: "canTalk" });
  const bringConsumes = useWatch({ control, name: "bringConsumes" });

  const onSubmit = async () => {
    setLoading(true);

    if (storage) {
      const data = storage.getItem("application");

      if (data) {
        const application = JSON.parse(data) as IApplication;
        await storeApplication(username, application);
      }
    }

    await router.push("/apply");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WhitePanel>
        <Question>
          <p>
            Are you able to use a microphone on discord and are happy to talk when needed?
          </p>

          <Controller
            name="canTalk"
            control={control}
            rules={{ required: "Please select one of these options" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="yes" label="Yes" control={<Radio />} />
                <FormControlLabel value="no" label="No" control={<Radio />} />
              </RadioGroup>
            )}
          />

          <FormHelperText error={!!errors?.canTalk}>
            {errors?.canTalk?.message}
          </FormHelperText>

          {canTalk === "no" && (
            <TextField
              {...register("cannotTalkReason", {
                required: true,
                minLength: { message: "Minimum characters allowed is 50", value: 50 },
                maxLength: { message: "Maximum characters allowed is 500", value: 500 },
              })}
              fullWidth
              label="Please explain why this might be a problem:"
              variant="outlined"
              error={!!errors?.cannotTalkReason}
              helperText={errors?.cannotTalkReason?.message}
              multiline
              minRows={3}
              maxRows={5}
            />
          )}
        </Question>
        <Question>
          <p>
            Are you able to enough bring consumables (e.g., food, elixirs/flasks, weapon
            enchants, etc...) for all boss attempts for each raid night per week? This
            includes both progression and farm raid nights.
          </p>

          <Controller
            name="bringConsumes"
            control={control}
            rules={{ required: "Please select one of these options" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="yes" label="Yes" control={<Radio />} />
                <FormControlLabel value="no" label="No" control={<Radio />} />
              </RadioGroup>
            )}
          />

          <FormHelperText error={!!errors?.bringConsumes}>
            {errors?.bringConsumes?.message}
          </FormHelperText>

          {bringConsumes === "no" && (
            <TextField
              {...register("cannotBringConsumesReason", {
                required: true,
                minLength: { message: "Minimum characters allowed is 50", value: 50 },
                maxLength: { message: "Maximum characters allowed is 500", value: 500 },
              })}
              fullWidth
              label="Please explain in more detail why this might be a problem for you."
              variant="outlined"
              error={!!errors?.cannotBringConsumesReason}
              helperText={errors?.cannotBringConsumesReason?.message}
              multiline
              minRows={3}
              maxRows={5}
            />
          )}
        </Question>

        <Question>
          <p>
            Please provide a short summary of your previous WoW experience, focusing
            mainly on your raiding experience and achievements.
          </p>

          <TextField
            {...register("wowExperience", {
              required: "Please tell us about your previous WoW experience",
              minLength: { message: "Minimum characters allowed is 100", value: 100 },
              maxLength: { message: "Maximum characters allowed is 1000", value: 1000 },
            })}
            fullWidth
            label="I started raiding back in..."
            variant="outlined"
            minRows={4}
            maxRows={10}
            multiline
            error={!!errors?.wowExperience}
            helperText={errors?.wowExperience?.message}
          />
        </Question>

        <Question>
          <p>
            Briefly describe your approach/philosophy to raiding (e.g., are you
            competitive, casual but effective, do you study boss tactics or world of
            logs?).
          </p>

          <TextField
            {...register("describeSelf", {
              required: "This question is required",
              minLength: { message: "Minimum characters allowed is 100", value: 100 },
              maxLength: { message: "Maximum characters allowed is 1000", value: 1000 },
            })}
            fullWidth
            label="I like to come prepared by..."
            variant="outlined"
            minRows={4}
            maxRows={10}
            multiline
            error={!!errors?.describeSelf}
            helperText={errors?.describeSelf?.message}
          />
        </Question>

        <Question>
          <p>Discord ID (so we can get in contact with you):</p>

          <TextField
            {...register("discordId", {
              required: "Please provider your Discord ID",
              maxLength: { message: "Maximum characters allowed is 50", value: 50 },
            })}
            fullWidth
            label="Enter your Discord ID here"
            variant="standard"
            error={!!errors?.discordId}
            helperText={errors?.discordId?.message}
          />
        </Question>

        <Question>
          <p>(Optional) Do you know anyone in the guild that could vouch for you?</p>

          <TextField
            {...register("vouch", {
              maxLength: { message: "Maximum characters allowed is 100", value: 100 },
            })}
            fullWidth
            label="If not, you can leave this empty"
            variant="standard"
            error={!!errors?.vouch}
            helperText={errors?.vouch?.message}
          />
        </Question>

        <Question>
          <p>
            (Optional) Is there something we should know? Travelling, demanding family or
            career that could get in the way of raiding etc.
          </p>

          <TextField
            {...register("anythingElse", {
              maxLength: { message: "Maximum characters allowed is 1000", value: 1000 },
            })}
            fullWidth
            label="If not, you can leave this empty"
            variant="standard"
            multiline
            maxRows={5}
            error={!!errors?.anythingElse}
            helperText={errors?.anythingElse?.message}
          />
        </Question>
      </WhitePanel>

      <footer
        css={css`
          margin: 30px auto 0 auto;
          display: flex;
          justify-content: center;
        `}
      >
        <BlizzardButton text="Submit Application" submit loading={loading} />
      </footer>
    </form>
  );
};

export default AboutYouForm;
