import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import TrelloCard from "./TrelloCard";
import TrelloButton from "./TrelloButton";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 10px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`;
const TrelloList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <h4>{title}</h4>
          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              index={index}
              text={card.text}
              id={card.id}    
              listID={listID}                                
            />
          ))}
          <TrelloButton listID={listID} isList />
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  );
};

export default TrelloList;
