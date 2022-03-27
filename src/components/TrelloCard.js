import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;
const TrelloCard = ({ text, id, index }) => {
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

const styles = {
  cardContainer: {
    marginBottom: 10,
  },
};

export default TrelloCard;
