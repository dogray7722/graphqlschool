import { useState } from "react";
import { TiTick } from "react-icons/ti";

const CourseStepper = () => {
  const steps = ["Basic Info", "Class Times", "Details"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // addCourse({ variables: { name, description } }).then((res) => {
    //   console.log(res.data.addCourse);
    //   setName("");
    //   setDescription("");
    // });
  };

  return (
    <>
      <div className="flex flex-col items-center font-kanit">
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:container flex flex-col items-center bg-neutral-100 font-kanit mt-8 pt-8 border md:rounded-2xl md:shadow-xl md:w-1/2 md:mx-auto"
      >
        {currentStep === 1 && (
          <div className="space-y-6 text-xl p-6 w-1/2">
            <div>
              <label htmlFor="name" className="course-manager-labels">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="rounded mt-1 shadow-slate-400 shadow-sm w-full"
              />
            </div>
            <div>
              <label htmlFor="description" className="course-manager-labels">
                Description
              </label>
              <textarea
                type="textarea"
                id="description"
                name="description"
                className="rounded mt-1 shadow-slate-400 shadow-sm w-full"
              ></textarea>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-6 text-xl p-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-12">
            <div>
              <label htmlFor="semester" className="course-manager-labels">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                className="rounded mt-1 shadow-slate-400 shadow-sm font-manrope w-full"
              >
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="course-manager-labels">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="w-full mt-1 rounded shadow-slate-400 shadow-sm font-manrope"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="course-manager-labels">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="form-input w-full mt-1 rounded shadow-slate-400 shadow-sm font-manrope"
              />
            </div>
            <div>
              <label htmlFor="startTime" className="course-manager-labels">
                Start Time
              </label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                className="form-input w-full mt-1 rounded shadow-slate-400 shadow-sm font-manrope"
              />
            </div>
            <div>
              <label htmlFor="courseDays" className="course-manager-labels">
                Course Days
              </label>
              <select
                name="courseDays"
                id="courseDays"
                multiple="multiple"
                className="block w-full h-48 rounded mt-1 font-manrope"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-6 text-xl p-6 w-1/2">
            <div>
              <label htmlFor="subject" className="course-manager-labels">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full mt-1 rounded shadow-slate-400 shadow-sm font-manrope"
              >
                <option value="1">Health and Safety</option>
                <option value="2">Business</option>
                <option value="3">Technique</option>
                <option value="3">Cuisine</option>
              </select>
            </div>
            <div>
              <label htmlFor="instructor" className="course-manager-labels">
                Instructor
              </label>
              <select
                id="instructor"
                name="instructor"
                className="w-full mt-1 rounded shadow-slate-400 shadow-sm font-manrope"
              >
                <option value="1">Fancois Devereaux</option>
                <option value="2">Giuseppe Bartolo</option>
                <option value="3">Kei Watanabe</option>
                <option value="3">Diego Rodriguez</option>
              </select>
            </div>
            <div>
              <label htmlFor="seats" className="course-manager-labels">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                id="seats"
                min="0"
                steps="1"
                placeholder="0"
                className="font-manrope mt-1 rounded w-1/4 shadow-slate-400 shadow-sm"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex flex-col md:ml-0 md:flex-row md:justify-center mt-10 mb-8">
            <button
              className="px-8 py-3 text-xl w-36 rounded-md text-white bg-blue-600"
              onClick={() => {
                currentStep === steps.length
                  ? setComplete(true)
                  : setCurrentStep((prev) => prev + 1);
              }}
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default CourseStepper;
