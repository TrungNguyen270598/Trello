import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@mui/material/Icon";
import { connect } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import { deleteCard, editCard } from "../action";

const CardContainer = styled.div`
  position: relative;
  margin: 0 0 8px 0;
  word-wrap: break-word;
  max-width: 100%;
`;

const EditButton = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  margin-left: 15px;
  display: none;
  ${CardContainer}:hover & {
    cursor: pointer;
  }
  &:hover {
    opacity: 1;
    background-color: #d4dad9;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 70%;
  opacity: 0.5;
  margin-left: 15px;
`;

const TrelloCard = ({ text, id, index, listID, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const handlDeleteCard = () => {
    // console.log('sss',listID);
    dispatch(deleteCard(id, listID));
  };

  // const closeForm = e => {
  //   setIsEditing(false);
  // };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();
    console.log("sdakdkSAVECARD", listID, cardText, id);
    dispatch(editCard(id.text, listID, cardText));
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      <div>
        <TextareaAutosize
          style={styles.TextareaAutosize}
          text={cardText}
          onChange={handleChange}
        ></TextareaAutosize>
        <Icon display={{ marginRigt: "18" }} onClick={saveCard}>
          save
        </Icon>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDoubleClick={() => setIsEditing(true)}
          >
            <CardContainer>
              <Card>
                <EditButton
                  fontSize="small"
                  onMouseDown={() => setIsEditing(true)}
                >
                  edit
                </EditButton>
                <DeleteButton fontSize="small" onMouseDown={handlDeleteCard}>
                  delete
                </DeleteButton>
                <CardContent>
                  <Typography gutterBottom>{text}</Typography>
                </CardContent>
              </Card>
            </CardContainer>
          </CardContainer>
        )}
      </Draggable>
    );
  };
  return isEditing ? renderEditForm() : renderCard();
};
const styles = {
  TextareaAutosize: {
    resize: "none",
    width: "90%",
    height: "100",
    border: "none",
    outline: "none",
    fontSize: 20,
  },
};

export default connect()(TrelloCard);
