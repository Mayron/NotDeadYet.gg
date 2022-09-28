import {
  css,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { characterClasses, specializations } from "../../../data";
import BlizzardButton from "../../blizzard-button";
import PrimaryProfessionQuestions from "../../primary-profession-questions";
import Question from "../../question";
import WhitePanel from "../../white-panel";

const defaultValues: ICharacterInfoFormInput = {
  characterName: "",
  characterClass: "",
  characterMainSpec: "",
  characterOffSpec: "",

  primaryProfession1: "",
  primaryMaxLevel1: "",
  primaryNotMaxedReason1: "",

  primaryProfession2: "",
  primaryMaxLevel2: "",
  primaryNotMaxedReason2: "",
};

const CharacterInfoForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICharacterInfoFormInput>({ defaultValues, mode: "onChange" });

  const characterClass = useWatch({ control, name: "characterClass" });
  const characterMainSpec = useWatch({ control, name: "characterMainSpec" });
  const characterOffSpec = useWatch({ control, name: "characterOffSpec" });
  const availableSpecs = characterClass ? specializations.get(characterClass) : undefined;

  const storage = typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist("application", { watch, setValue, storage });

  const onSubmit = async () => {
    setLoading(true);
    await router.push("/apply/about-you");
  };

  const handleClassChanged = (e: SelectChangeEvent<WoWClass>) => {
    const value = e.target.value as WoWClass;
    setValue("characterClass", value);
    setValue("characterMainSpec", "");
    setValue("characterOffSpec", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WhitePanel>
        <Question>
          <p>What is the name of the character you are applying with?</p>

          <TextField
            {...register("characterName", {
              required: true,
              maxLength: { message: "Maximum characters allowed is 20", value: 20 },
              pattern: { value: /^\S+$/, message: "Invalid character name" },
            })}
            label="Character Name"
            variant="standard"
            error={!!errors?.characterName}
            helperText={errors?.characterName?.message}
          />
        </Question>

        <Question>
          <p>What class is this character?</p>

          <FormControl
            css={css`
              min-width: 200px;
            `}
          >
            <InputLabel id="characterClassLabel">Class</InputLabel>
            <Select
              {...register("characterClass", {
                required: "Please select your character",
              })}
              value={characterClass}
              placeholder="Class"
              labelId="characterClassLabel"
              label="Class"
              onChange={handleClassChanged}
            >
              {characterClasses.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormHelperText error={!!errors?.characterClass}>
            {errors?.characterClass?.message}
          </FormHelperText>
        </Question>

        {availableSpecs && (
          <Question>
            <p>What is this character&apos;s main and off specialization?</p>

            <div
              css={css`
                display: flex;
              `}
            >
              <div>
                <FormControl
                  css={css`
                    min-width: 200px;
                    margin-right: 20px;
                  `}
                >
                  <InputLabel id="characterMainSpecLabel">Main-Spec</InputLabel>
                  <Select
                    {...register("characterMainSpec", {
                      required: "Please select your main-spec",
                    })}
                    disabled={availableSpecs === undefined}
                    value={characterMainSpec}
                    placeholder="Main-Spec"
                    labelId="characterMainSpecLabel"
                    label="Main-Spec"
                  >
                    {availableSpecs?.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormHelperText error={!!errors?.characterMainSpec}>
                  {errors?.characterMainSpec?.message}
                </FormHelperText>
              </div>
              <div>
                <FormControl
                  css={css`
                    min-width: 200px;
                  `}
                >
                  <InputLabel id="characterOffSpecLabel">Off-Spec</InputLabel>
                  <Select
                    {...register("characterOffSpec", {
                      required: "Please select your off-spec",
                    })}
                    disabled={availableSpecs === undefined}
                    value={characterOffSpec}
                    placeholder="Off-Spec"
                    labelId="characterOffSpecLabel"
                    label="Off-Spec"
                  >
                    {availableSpecs?.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormHelperText error={!!errors?.characterOffSpec}>
                  {errors?.characterOffSpec?.message}
                </FormHelperText>
              </div>
            </div>
          </Question>
        )}
      </WhitePanel>

      <WhitePanel>
        <header
          css={css`
            padding-top: 40px;
            padding-bottom: 15px;
          `}
        >
          <h3>Professions</h3>

          <p>
            In the below sections, enter the name and skill level for both of your primary
            professions (note: the maximum skill level for Burning Crusade Classic is{" "}
            <b>375</b> and for Wrath Classic it is <b>450</b>).
          </p>
        </header>

        <PrimaryProfessionQuestions
          register={register}
          control={control}
          errors={errors}
          id={1}
        />

        <PrimaryProfessionQuestions
          register={register}
          control={control}
          errors={errors}
          id={2}
        />
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

export default CharacterInfoForm;
