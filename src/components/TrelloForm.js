import React,{useState} from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Icon from "@mui/material/Icon";
import {connect} from 'react-redux'

import {addList,addCard} from '../action'
function TrelloForm(props) {
  const [input, setInput] = useState("");
  const { onBlur,isList, listID} = props;
  
  const placeholder = isList ? "Enter a title for this card..." : "Enter list title..." ;
  const buttonTitle = isList ? "Add card" : "Add list"
  // const buttonTitle = list ? "Add list" : "Add card";
  const onChangeInput = (e) => {
    setInput(e.target.value)
  }
  
  const handleAddList = () => {
    const {dispatch} = props;
   
    if(input) {
      dispatch(addList(input))
      console.log('input',input)
    }
    return;
  };
  


  const handleAddCard = () => {
    const {dispatch} = props;
    if(input) {
      dispatch(addCard(input,listID))
      console.log('listID',listID)
    }
  }


  return (
    <div>
      <Card
        style={{
          overflow: "visible",
          minHeight: 80,
          minWidth: 272,
          padding: "6px 8px 2px",         
        }}
      >
        <TextareaAutosize
          style={styles.TextareaAutosize}
          placeholder={placeholder}
          autoFocus
          value={input}
          onChange={onChangeInput}
          onBlur={onBlur}     
        />
      </Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Button 
                onMouseDown={isList ? handleAddCard : handleAddList}
                
                variant="contained"
                style = {{color:"white",backgroundColor:"#5aac44"}}
        >{buttonTitle}</Button>

        <Icon style={{marginLeft:8,cursor:"pointer"}}>close</Icon>
      </div>
    </div>
  );
}

const styles = {
  TextareaAutosize: {
    resize: "none",
    width: "100%",
    border: "none",
    overflow: "hidden",
    outline: "none",
    
  },
};

export default connect() (TrelloForm);
