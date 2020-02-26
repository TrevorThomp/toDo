import React, { useState } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const currentPageAdd = () => {
    setCurrentPage(currentPage + 1);
  };

  const currentPageSubtract = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPageAdd = () => {
    setTotalPages(totalPages + 1);
  };

  const state = {
    currentPage,
    totalPages,
    currentPageAdd: currentPageAdd,
    currentPageSubtract: currentPageSubtract,
    totalPageAdd: totalPageAdd
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
