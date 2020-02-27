import React, { useState } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [displayCompleted, setDisplayCompleted] = useState(true);
  const [itemsDisplayed, setItemsDisplayed] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentDisplayed, setCurrentDisplayed] = useState();

  const state = {
    displayCompleted,
    setDisplayCompleted,
    itemsDisplayed,
    setItemsDisplayed,
    pageNumber,
    setPageNumber,
    currentDisplayed,
    setCurrentDisplayed
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
