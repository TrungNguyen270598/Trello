import { CONSTANTS } from "../action";

let listID = 2;
let cardID = 5;

const initialState = [
  {
    title: "Todo",
    id: `list-${0}`,
    cards: [
      {
        id: `list-${0}`,
        text: "We created static list and static card",
      },
      {
        id: `list-${1}`,
        text: "We used a mix between material UI and style components",
      },
    ],
  },
  {
    title: "Doing",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "We created static list and static card",
      },
      {
        id: `card-${3}`,
        text: "We used a mix between material UI and style components",
      },
      {
        id: `card-${4}`,
        text: "We will also make some little changes",
      },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,       
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];
      
      case CONSTANTS.EDIT_CARD: {     
          return state.map((list)=>{
            if(list.cards.id === action.payload.id) {
              return {
                ...list,
                text: action.payload.text
              }
            }
            console.log('a121bbr',list.cards.id,action.payload.id)
            return list;
          })        
      }

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,     
      };
      cardID += 1;
      console.log("action received", action);
      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      console.log("newState", newState);
      console.log("newcard", newCard);     
      return newState;
    }

    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;
      console.log('listID,id',listID,id)
      return state.map((list) => {
        if (list.id === listID) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== id),
          };
        }
        return list;
      });
    }


    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        
      } = action.payload;
      const newState = [...state];

      //dragging lists around
      // if(type === "list") {
      //   const list = newState.splice(droppableIndexStart,1);
      //   newState.splice(droppableIndexEnd,0,...list);
      //   return newState;
      // }

      //In the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        
      }

      //other list
      if (droppableIdStart !== droppableIdEnd) {
        //find the list where drag happened
        const listStart = state.find((list) => droppableIdStart === list.id);

        //pull out the card from the list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        //find the list where drag end
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        //put the card in the  list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    default:
      return state;
  }
};

export default listsReducer;
