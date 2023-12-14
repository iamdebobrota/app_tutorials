import { TourProvider } from "@reactour/tour";
import styles from "./guided.module.css";
import { guidedSteps } from "./steps";
import {
  commonBtnStyles,
  badgeStyle,
  maskStyles,
  popoverStyles,
} from "./tour-styles";
import "./guided-tour.css";
import { useState } from "react";

const Tour = ({ children }) => {
  const [currentStepC, setCurrentStepC] = useState(0);

  return (
    <>
      <TourProvider
        className={`${
          currentStepC + 1 === 5
            ? styles.topArrow
            : currentStepC + 1 === 4
            ? styles.leftBottomArrow
            : styles.leftTopArrow
        }`}
        showCloseButton={false}
        steps={guidedSteps}
        position={currentStepC + 1 === 5 ? "bottom" : "right"}
        showDots={false}
        padding={{
          mask: [currentStepC + 1 === 5 ? 15 : 3, 5],
          popover: [5, 5],
        }}
        styles={{
          popover: (base) => ({
            ...base,
            "--reactour-accent": "#ef5a3d",
            ...popoverStyles,
            left: "5px",
          }),

          badge: (base) => ({
            ...base,
            ...badgeStyle,
          }),
          maskArea: (base) => ({
            ...base,
            ...maskStyles,
            rx: 10,
          }),
        }}
        badgeContent={({ totalSteps, currentStep }) =>
          currentStep + 1 + "/" + totalSteps
        }
        prevButton={({ currentStep, setCurrentStep, steps }) => {
          return (
            <button
              disabled={currentStep === 0}
              style={{
                ...commonBtnStyles,
                background: "#F2F7FF",
                display: currentStep === 0 ? "none" : "block",
                visibility: currentStep === 0 ? "hidden" : "visible",

                color: "#3470E4",
              }}
              onClick={() => {
                if (currentStep === 0) {
                  setCurrentStep(() => {
                    let currStep = steps ? steps.length - 1 : 0;
                    setCurrentStepC(currStep);
                    return currStep;
                  });
                } else {
                  setCurrentStep(() => {
                    let currStep = currentStep - 1;
                    setCurrentStepC(currStep);
                    return currStep;
                  });
                }
              }}>
              previous
            </button>
          );
        }}
        nextButton={({
          Button,
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
          steps,
        }) => {
          const last = currentStep === stepsLength - 1;
          return (
            <button
              style={{
                ...commonBtnStyles,
                background: "#3470E4",
                color: "#FFFFFF",
              }}
              onClick={() => {
                if (last) {
                  setIsOpen(false);
                  setCurrentStep(0);
                  setCurrentStepC(0);
                } else {
                  setCurrentStep((s) => {
                    let currStep = steps && s === steps?.length - 1 ? 0 : s + 1;
                    setCurrentStepC(currStep);
                    return currStep;
                  });
                }
              }}>
              {last ? "Got it!" : "Next"}
            </button>
          );
        }}>
        {children}
      </TourProvider>
    </>
  );
};

export default Tour;
