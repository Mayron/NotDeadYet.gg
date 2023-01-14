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
import Button from "@mui/material/Button";
import { useCallback } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { characterClasses, specializations } from "../../data";
import PrimaryProfessionQuestions from "../primary-profession-questions";
import Question from "../question";
import WhitePanel from "../white-panel";

interface ICharacterInfoProps {
  characterId: number;
  onRemove: (index: number) => void;
}

const CharacterInfo: React.FC<ICharacterInfoProps> = ({ characterId, onRemove }) => {
  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ICharacterInfoFormInput>();

  const characterClass = useWatch({ control, name: `characters.${characterId}.class` });

  const characterMainSpec = useWatch({
    control,
    name: `characters.${characterId}.mainSpec`,
  });

  const characterOffSpec = useWatch({
    control,
    name: `characters.${characterId}.offSpec`,
  });

  const availableSpecs = characterClass ? specializations.get(characterClass) : undefined;

  const characterErrors =
    errors?.characters &&
    errors?.characters[characterId] &&
    errors?.characters[characterId];

  const handleClassChanged = useCallback(
    (e: SelectChangeEvent<WoWClass>) => {
      const value = e.target.value as WoWClass;
      setValue(`characters.${characterId}.class`, value);
      setValue(`characters.${characterId}.mainSpec`, "");
      setValue(`characters.${characterId}.offSpec`, "");
    },
    [characterId, setValue],
  );

  return (
    <WhitePanel>
      <header style={{ position: "relative" }}>
        <h2 style={{ textAlign: characterId > 0 ? "left" : "center" }}>
          {characterId === 0 ? "Main Character" : `Alt Character #${characterId}`}
        </h2>
        {characterId === 0 && (
          <p>
            This section relates to the main character you are applying to join our
            guild&apos;s core raiding roster with. Only 1 of your characters will be
            considered your main character. This will be the character you will be
            attending the majority of our raids with.
          </p>
        )}
        {characterId > 0 && (
          <Button
            variant="outlined"
            onClick={() => onRemove(characterId)}
            css={css`
              position: absolute;
              top: 0;
              right: 0;
            `}
          >
            Remove Alt
          </Button>
        )}
      </header>
      <Question horizontal>
        <p>Character Name:</p>

        <TextField
          {...register(`characters.${characterId}.name`, {
            required: true,
            maxLength: { message: "Maximum characters allowed is 20", value: 20 },
            pattern: { value: /^\S+$/, message: "Invalid character name" },
          })}
          label="Character Name"
          variant="standard"
          error={!!characterErrors?.name}
          helperText={characterErrors?.name?.message}
        />
      </Question>

      <Question horizontal>
        <p>Character Class:</p>

        <FormControl
          css={css`
            min-width: 200px;
          `}
        >
          <InputLabel id={`classLabel${characterId}`}>Class</InputLabel>
          <Select
            {...register(`characters.${characterId}.class`, {
              required: "Please select your character",
            })}
            value={characterClass}
            placeholder="Class"
            labelId={`classLabel${characterId}`}
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

        <FormHelperText error={!!characterErrors?.class}>
          {characterErrors?.class?.message}
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
                <InputLabel id={`mainSpecLabel${characterId}`}>Main-Spec</InputLabel>
                <Select
                  {...register(`characters.${characterId}.mainSpec`, {
                    required: "Please select your main-spec",
                  })}
                  disabled={availableSpecs === undefined}
                  value={characterMainSpec}
                  placeholder="Main-Spec"
                  labelId={`mainSpecLabel${characterId}`}
                  label="Main-Spec"
                >
                  {availableSpecs?.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormHelperText error={!!characterErrors?.mainSpec}>
                {characterErrors?.mainSpec?.message}
              </FormHelperText>
            </div>
            <div>
              <FormControl
                css={css`
                  min-width: 200px;
                `}
              >
                <InputLabel id={`offSpecLabel${characterId}`}>Off-Spec</InputLabel>
                <Select
                  {...register(`characters.${characterId}.offSpec`, {
                    required: "Please select your off-spec",
                  })}
                  disabled={availableSpecs === undefined}
                  value={characterOffSpec}
                  placeholder="Off-Spec"
                  labelId={`offSpecLabel${characterId}`}
                  label="Off-Spec"
                >
                  <MenuItem value="None">None</MenuItem>
                  {availableSpecs?.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormHelperText error={!!characterErrors?.offSpec}>
                {characterErrors?.offSpec?.message}
              </FormHelperText>
            </div>
          </div>
        </Question>
      )}

      <header
        css={css`
          padding-top: 40px;
          padding-bottom: 15px;
        `}
      >
        <h3>Professions</h3>

        <p>
          In the below sections, enter the name and skill level for both of your primary
          professions
          <br />
          (Note: the maximum skill level for Wrath Classic is <b>450</b>).
        </p>
      </header>
      <PrimaryProfessionQuestions characterId={characterId} professionId={0} />
      <PrimaryProfessionQuestions characterId={characterId} professionId={1} />
    </WhitePanel>
  );
};

export default CharacterInfo;
