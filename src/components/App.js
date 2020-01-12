import React from "react";
import "./App.css";
const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }
  componentDidMount() {
    console.log("componentDidMount");
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(singleDocument => {
          const data = singleDocument.data();
          data["id"] = singleDocument.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }
  render() {
    console.log("render");
    return "Here we go";
  }
}

export default App;
