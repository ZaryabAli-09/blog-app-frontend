import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="bg-opacity-70 text-sm bg-gray-400 rounded-lg p-6">
      <p className="text-white text-center">{message}</p>
      <div className="mt-7 flex items-center justify-center">
        <button
          className="bg-white p-2 text-black w-11 rounded-lg font-semibold hover:bg-green-700 hover:text-white mx-2"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="bg-white text-black p-2 w-11 rounded-lg font-semibold hover:bg-red-700 hover:text-white mx-2"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
