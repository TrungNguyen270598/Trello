import {CONSTANTS} from "../action"

export const addCard = (text,listID) => {
    return {
        type:CONSTANTS.ADD_CARD,
        payload : {text,listID}
    };
};

export const deleteCard = (id, listID) => {
    return {
      type: CONSTANTS.DELETE_CARD,
      payload: { id, listID }
    };
  };

  export const editCard = (id,listID, newText) => {
    return {
      type: CONSTANTS.EDIT_CARD,
      payload: { id,listID, newText },
    };
  };