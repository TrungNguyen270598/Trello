import React, { useState } from "react";
import Icon from "@mui/material/Icon";
import { connect } from "react-redux";
import {} from "../action";

import TrelloForm from "./TrelloForm";

function TrelloButton(props) {
  const { isList, listID } = props;
  const [showForm, setShowForm] = useState(true);

  const onBlur = () => {
    setShowForm(!showForm);
  };

  const buttonText = isList ? "Add another card" : "Add another list";
  const buttonTextOpacity = isList ? 1 : 0.5;
  const buttonTextColor = isList ? "inherit" : "black";
  const buttonTextBackground = isList ? "inherit" : "rgba(0,0,0,0.15)";
  // const buttonText = "Add another card"
  // "inherit" "rgba(0,0,0,0.15)"
  return (
    <>
      {showForm ? (
        <div
          onClick={onBlur}
          style={{
            ...styles.openForButtonGroup,
            opacity: buttonTextOpacity,
            color: buttonTextColor,
            backgroundColor: buttonTextBackground,
          }}
        >
          <Icon>add</Icon>
          <p style={{ marginRight: 8 }}>{buttonText}</p>
        </div>
      ) : (
        <TrelloForm listID={listID} onBlur={onBlur} isList={isList} />
      )}
    </>
  );
}

const styles = {
  openForButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
};

export default connect()(TrelloButton);
