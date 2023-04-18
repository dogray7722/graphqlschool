import { useState } from "react";
import { TiTick } from "react-icons/ti";

const CourseStepper = () => {
  const steps = ["Basic Info", "Class Times", "Details"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-10 h-screen items-center justify-center font-kanit">
        <div className="flex justify-between">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              }`}
            >
              <div className="step">
                {i + 1 < currentStep || complete ? i + 1 : <TiTick size={24} />}
              </div>
              <p className="text-gray-800">{step}</p>
            </div>
          ))}
        </div>
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};
export default CourseStepper;
