import { Button, css } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import BlizzardButton from "../../blizzard-button";
import WhitePanel from "../../white-panel";
import CharacterInfo from "../character-info";

const defaultValues: ICharacterInfoFormInput = {
  characters: [
    {
      name: "",
      class: "",
      mainSpec: "",
      offSpec: "",

      professions: [
        {
          name: "",
          maxLevel: "",
          notMaxedReason: "",
        },
        {
          name: "",
          maxLevel: "",
          notMaxedReason: "",
        },
      ],
    },
  ],
};

const CharacterInfoForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ICharacterInfoFormInput>({ defaultValues, mode: "onChange" });
  const { watch, setValue, handleSubmit, control } = form;

  const characters = useWatch({ control, name: "characters" });

  const storage = typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist("application", { watch, setValue, storage });

  const onSubmit = useCallback(async () => {
    setLoading(true);
    await router.push("/apply/about-you");
  }, [router]);

  const addAltCharacter = useCallback(() => {
    const altDefaults = defaultValues.characters[0];
    const altInfo: ICharacterInfo = { ...altDefaults };
    setValue(`characters.${characters.length}`, altInfo);
  }, [characters.length, setValue]);

  const getCharacterInfoForms = useCallback(() => {
    const forms = [];

    for (let i = 0; i < characters.length; i++) {
      forms.push(<CharacterInfo key={i} characterId={i} />);
    }

    return forms;
  }, [characters.length]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {getCharacterInfoForms()}

        {characters.length < 4 && (
          <WhitePanel headerBorder={false}>
            <header
              css={css`
                text-align: center;

                p {
                  border-bottom: none;
                }

                button {
                  margin: 20px auto 0 auto;
                }
              `}
            >
              <h3>Alt Characters</h3>

              <p>
                If you have other characters (alts) that could potentially help with guild
                raids, please add them.
              </p>
              <Button variant="outlined" onClick={addAltCharacter}>
                Add Alt Character
              </Button>
            </header>
          </WhitePanel>
        )}

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
    </FormProvider>
  );
};

export default CharacterInfoForm;
