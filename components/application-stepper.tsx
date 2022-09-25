import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { css } from "@emotion/react";
import { StepButton } from "@mui/material";
import { useRouter } from "next/router";
import Route from "./route";

const steps = ["Requirements", "Character Info", "About You"];
const urls = ["/apply", "/apply/character-info", "/apply/about-you"];

interface IApplicationStepperProps {
  activeStep: number;
}

const stepCompletedStyle = css`
  &:hover {
    span.Mui-completed {
      color: #1976d2 !important;
      text-decoration: underline;
    }
  }
`;

const ApplicationStepper: React.FC<IApplicationStepperProps> = ({ activeStep }) => {
  const router = useRouter();

  const handleStep = async (step: number) => {
    await router.push(urls[step]);
  };

  return (
    <div
      css={css`
        margin-bottom: 30px;
      `}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            {index < activeStep ? (
              <StepButton css={stepCompletedStyle} onClick={() => handleStep(index)}>
                {label}
              </StepButton>
            ) : (
              <StepLabel>{label}</StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ApplicationStepper;
