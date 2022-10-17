import axios from "axios";
import { useState } from "react";
import getDaysSpan from "./util/getDaysSpan";
const App = () => {
  const [businessData, setBusinessData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return;
    const id = inputValue;
    axios
      .get(`http://localhost:3000/business/${id}`)
      .then((res) => {
        setBusinessData(res.data);
        setIsError(false);
      })
      .catch((e) => {
        setBusinessData(null);
        setIsError(true);
      });
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 min-w-[400px] max-w-[900px]">
        <span>IDs: GXvPAor1ifNfpF0U5PTG0w | ohGSnJtMIC5nPfYRi_HTAg</span>
        <form
          className="flex flex-row justify-between gap-4 col-span-2"
          onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="flex/90 w-full rounded-md pl-2 focus:outline-blue-400 shadow-sm"
            placeholder="Enter an id"
            value={inputValue}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="flex/10 bg-blue-400 px-4 py-2 rounded-md text-white shadow-sm">
            Submit
          </button>
        </form>
        {isError && (
          <p className="col-span-2 text-red-600">
            There was an error processing your request.
          </p>
        )}
        {businessData && (
          <>
            <div className="items-start justify-items-start">
              <h1 className="text-2xl font-extrabold">
                {businessData.displayed_what}
              </h1>
              <p className="text-gray-600 font-medium">
                {businessData.displayed_where}
              </p>
            </div>
            <div className="items-end justify-end">
              <span className="text-xl font-extrabold">Opening hours</span>
              &nbsp;
              <span
                className={`${
                  businessData.isOpenNow ? "text-green-500" : "text-red-500"
                } capitalize`}>
                {businessData.isOpenNow ? "Open now" : "Closed"}
              </span>
              {businessData.opening_hours.map((item) => (
                <div className="grid grid-cols-2" key={item.daysInTheWeek}>
                  <span className="capitalize">
                    {getDaysSpan(item.daysInTheWeek)}
                  </span>
                  <div className="flex flex-col items-end justify-end mb-4">
                    {item.workingHours[0].map((hour) => (
                      <span key={hour.start}>
                        {hour.start} - {hour.end}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
