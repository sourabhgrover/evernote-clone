import React from "react";

import firebase from "./Firebase";
import EditorComponent from "./Editor";
import SideBarComponent from "./SideBar";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }
  componentDidMount() {

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
    return (
      <div className="app-container">
        <SideBarComponent selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes} />
        <EditorComponent />
      </div>);
  }

}

export default App;
