import React,{ useState} from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@mui/material/Icon";
import { connect } from "react-redux";

import TrelloButton from "./TrelloButton";
import TrelloForm from"./TrelloForm";
import { deleteCard } from "../action";


const CardContainer = styled.div`
  position: relative;
  margin: 0 0 8px 0;
  word-wrap: break-word;
  max-width: 100%;
`;

// const EditButton = styled(Icon)`
//   position: absolute;
//   right: 5px;
//   top: 5px;
//   opacity: 0.5;
//   margin-left: 15px;
//   display:none;
//   ${CardContainer}:hover & {
//     cursor: pointer;
//   }
//   &:hover {
//     opacity: 1;
//     background-color: #d4dad9;
//   }
// `;

const DeleteButton = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 70%;
  opacity: 0.5;
  margin-left: 15px;

`

const TrelloCard = ({ text, id, index,listID,dispatch}) => {
  
  const handlDeleteCard = () => {

    // console.log('sss',listID);
    dispatch(deleteCard(id, listID))
  }

  
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContainer>
            <Card>

              <DeleteButton fontSize="small" onMouseDown={handlDeleteCard} style >
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
            
export default connect()(TrelloCard);
