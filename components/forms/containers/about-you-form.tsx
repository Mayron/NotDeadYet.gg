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
  inGuild: "",
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

  const canTalk = useWatch({ control, name: "canTalk" });
  const inGuild = useWatch({ control, name: "inGuild" });
  const bringConsumes = useWatch({ control, name: "bringConsumes" });

  const storage = typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist("application", { watch, setValue, storage });

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
            If you are already in the guild and are just registering your character to the
            website then you can skip most of this section. Select the option that applies
            to you:
          </p>
          <Controller
            name="inGuild"
            control={control}
            rules={{ required: "Please select one of these options" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="yes"
                  label="Yes, I just want to register my character on the website."
                  control={<Radio />}
                />
                <FormControlLabel
                  value="no"
                  label="No, I am a new applicant who wants to join the guild."
                  control={<Radio />}
                />
              </RadioGroup>
            )}
          />
        </Question>
        {inGuild === "no" && (
          <>
            <Question>
              <p>
                Are you able to use a microphone on discord and are happy to talk when
                needed?
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
                    maxLength: {
                      message: "Maximum characters allowed is 500",
                      value: 500,
                    },
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
                Are you able to enough bring consumables (e.g., food, elixirs/flasks,
                weapon enchants, etc...) for all boss attempts for each raid night per
                week? This includes both progression and farm raid nights.
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
                    maxLength: {
                      message: "Maximum characters allowed is 500",
                      value: 500,
                    },
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
                Please provide a short summary of your previous WoW raiding experience:
                <span
                  css={css`
                    padding-top: 15px;
                    display: block;
                    padding-left: 15px;
                  `}
                >
                  <b>For example:</b>
                  <ul>
                    <li>
                      What recent noteworthy bosses or raids have you cleared as part of a
                      guild or pug group?
                    </li>
                    <li>How long have you been raiding or playing WoW for?</li>
                    <li>What made you leave your previous guild/s?</li>
                    <li>
                      Do you have any warcraft logs you want share to support any claims
                      you have made?
                    </li>
                  </ul>
                </span>
              </p>

              <TextField
                {...register("wowExperience", {
                  required: "Please tell us about your previous WoW experience",
                  minLength: { message: "Minimum characters allowed is 100", value: 100 },
                  maxLength: {
                    message: "Maximum characters allowed is 1000",
                    value: 1000,
                  },
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
                Briefly describe your approach/philosophy towards raiding within a guild:
                <span
                  css={css`
                    padding-top: 15px;
                    display: block;
                    padding-left: 15px;
                  `}
                >
                  <b>For example:</b>
                  <ul>
                    <li>
                      Are you competitive or casual (e.g. Do you like fast progression at
                      the cost of a less friendly guild raiding environment or would you
                      prefer more mistakes but more socialising?)
                    </li>
                    <li>
                      What do you do to improve your raiding performance (e.g., how do you
                      learn boss fights? How do you stay up to date with your class
                      mechanics?)
                    </li>
                    <li>
                      What is your attitude towards loot and its distribution to raid
                      members? Would you let someone else have an item you wanted if it
                      would benefit guild progression?
                    </li>
                    <li>
                      How do these questions differ when asked based on progression raids
                      versus farm raids?
                    </li>
                    <li>Why do you prefer guild raids versus joining a pug group?</li>
                  </ul>
                </span>
              </p>

              <TextField
                {...register("describeSelf", {
                  required: "This question is required",
                  minLength: { message: "Minimum characters allowed is 100", value: 100 },
                  maxLength: {
                    message: "Maximum characters allowed is 1000",
                    value: 1000,
                  },
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
                label="Enter your Discord ID here"
                variant="standard"
                css={css`
                  min-width: 300px;
                `}
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
                variant="outlined"
                maxRows={3}
                error={!!errors?.vouch}
                helperText={errors?.vouch?.message}
              />
            </Question>

            <Question>
              <p>
                (Optional) Is there something we should know? Travelling, demanding family
                or career that could get in the way of raiding etc.
              </p>

              <TextField
                {...register("anythingElse", {
                  maxLength: {
                    message: "Maximum characters allowed is 1000",
                    value: 1000,
                  },
                })}
                fullWidth
                label="If not, you can leave this empty"
                variant="outlined"
                multiline
                maxRows={5}
                minRows={3}
                error={!!errors?.anythingElse}
                helperText={errors?.anythingElse?.message}
              />
            </Question>
          </>
        )}
      </WhitePanel>

      {inGuild && (
        <footer
          css={css`
            margin: 30px auto 0 auto;
            display: flex;
            justify-content: center;
          `}
        >
          <BlizzardButton
            text={inGuild === "yes" ? "Submit Registration" : "Submit Application"}
            submit
            loading={loading}
          />
        </footer>
      )}
    </form>
  );
};

export default AboutYouForm;
