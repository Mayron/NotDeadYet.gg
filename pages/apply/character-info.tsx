/* eslint-disable react/jsx-props-no-spreading */
import { css } from "@emotion/react";
import Layout from "../../components/layout";
import BackgroundPattern from "../../components/background-pattern";
import CharacterInfoForm from "../../components/forms/containers/character-info-form";
import ApplicationStepper from "../../components/application-stepper";

const CharacterInfoPage: React.FC = () => (
  <Layout title="Apply | Not Dead Yet">
    <BackgroundPattern />
    <section>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Character Information
        </h1>

        <p
          css={css`
            margin-bottom: 60px;
            font-size: 1.125rem;
            text-align: center;
          `}
        >
          Please provide the following basic character details for the character you are
          applying with.
        </p>
        <ApplicationStepper activeStep={1} />
      </header>

      <CharacterInfoForm />
    </section>
  </Layout>
);

export default CharacterInfoPage;
