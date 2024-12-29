import React from "react";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-32">
      <span className="text-red-500 font-semibold text-lg">
        Error loading data
      </span>
      <p className="text-gray-600 text-sm mt-2">
        Make sure you are connected to the internet and try again.
      </p>
    </div>
  );
};

export default ErrorMessage;
