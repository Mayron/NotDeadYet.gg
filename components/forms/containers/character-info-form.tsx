import {
  css,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { characterClasses } from "../../../data";
import BlizzardButton from "../../blizzard-button";
import PrimaryProfessionQuestions from "../../primary-profession-questions";
import Question from "../../question";

const defaultValues: ICharacterInfoFormInput = {
  characterName: "",
  characterClass: "",
  characterMainSpec: "",

  primaryProfession1: "",
  primaryMaxLevel1: "",
  primaryNotMaxedReason1: "",

  primaryProfession2: "",
  primaryMaxLevel2: "",
  primaryNotMaxedReason2: "",
};

const CharacterInfoForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICharacterInfoFormInput>({ defaultValues });

  const onSubmit = (data: ICharacterInfoFormInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Question>
        <p>What is the name of the character you are applying with?</p>

        <TextField
          {...register("characterName", {
            required: true,
            maxLength: { message: "Maximum characters allowed is 20", value: 20 },
            pattern: { value: /^\S+$/, message: "Invalid character name" },
          })}
          fullWidth
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
              required: true,
            })}
            labelId="characterClassLabel"
            label="Class"
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

      <Question>
        <p>Main Specialization</p>

        <TextField
          {...register("characterMainSpec", {
            required: true,
            maxLength: { message: "Maximum characters allowed is 100", value: 100 },
          })}
          fullWidth
          label="Enter your character's main spec here"
          variant="standard"
          error={!!errors?.characterMainSpec}
          helperText={errors?.characterMainSpec?.message}
        />
      </Question>

      <header
        css={css`
          padding-top: 40px;
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

      <hr />

      <PrimaryProfessionQuestions
        register={register}
        control={control}
        errors={errors}
        id={2}
      />

      <footer
        css={css`
          margin: 30px auto 0 auto;
        `}
      >
        <BlizzardButton text="Continue" submit />
      </footer>
    </form>
  );
};

export default CharacterInfoForm;
