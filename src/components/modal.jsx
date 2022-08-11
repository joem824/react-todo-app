import React, { useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ showModal, toggleModal, addNewItem }) => {
  const inputRef = useRef();
  return (
    <>
      {showModal && (
        <div className="flex justify-center items-center bg-gray-400 bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
              <div className="flex w-80 items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font-semibold dark:text-gray-50">
                  Add New Task
                </h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={toggleModal}
                >
                  <AiFillCloseCircle className="text-2xl dark:text-gray-50" />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <label className="block text-black dark:text-gray-50 text-sm font-bold mb-1">
                  Task Title:
                </label>
                <input
                  ref={inputRef}
                  className="shadow appearance-none border-2 rounded w-full py-2 px-1 text-black"
                />
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => addNewItem(inputRef)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
