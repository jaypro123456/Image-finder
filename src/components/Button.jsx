import React from "react";

const button = ({ handleLoadMore }) => {
  return (
    <button onClick={handleLoadMore} className="Button">
      load more
    </button>
  );
};

export default button;
