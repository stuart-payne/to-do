import React from "react";

export default function ToDoControl(props) {
  const { changeFilter, value } = props;
  return (
    <button
      type="button"
      className="btn btn-outline-primary mx-1"
      onClick={changeFilter}
    >
      {value}
    </button>
  );
}
