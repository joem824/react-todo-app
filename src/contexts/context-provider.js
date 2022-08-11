import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("teal");
  const [currentMode, setCurrentMode] = useState("Light");
  const [isLoading, setIsLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const setMode = () => {
    let finalMode = "Light";
    if (currentMode === "Light") {
      finalMode = "Dark";
    } else {
      finalMode = "Light";
    }

    setCurrentMode(finalMode);

    localStorage.setItem("themeMode", finalMode);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);
  };

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        isLoading,
        setIsLoading,
        taskList,
        setTaskList,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
