import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import TrelloButton from "./TrelloButton";
import Trellolist from "./TrelloList";
import { sort } from "../action";
import styled from "styled-components";

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

function App(props) {
  const { lists } = props;
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1 className="title">Trello</h1>
        <ListContainer>
          {lists.map((list) => (
            <Trellolist
              listID={list.id}
              key={list.id}
              title={list.title}
              cards={list.cards}
            />
          ))}
          <TrelloButton props />
        </ListContainer>
      </div>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

export default connect(mapStateToProps)(App);
// export default App;
