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
        this.setState({ notes: notes });
      });
  }
  render() {
    return (
      <div className="app-container">
        <SideBarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          addNewNote={this.addNewNote}
        />
        {
          // If any note is selected than render Editor Component
          this.state.selectedNote ?
            <EditorComponent
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              selectedNote={this.state.selectedNote}
              updateNote={this.updateNote}
            /> : null
        }

      </div>);
  }

  selectNote = (n, i) => {
    this.setState({ selectedNoteIndex: i, selectedNote: n })
  }

  // Function will update note data in firebase
  updateNote = (id, noteObj) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

  }

  // Add new note in firebase
  addNewNote = async (title) => {
    const newNote = {
      title,
      body: ''
    }
    const newNoteFirebase = await firebase.firestore().collection('notes').add({
      title: newNote.title,
      body: newNote.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Update Notes State
    await this.setState({ notes: [...this.state.notes, newNote] });
    // Update Selected Note and Set to Newly Created Note
    const newNoteIndex = await this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newNoteFirebase.id))
    await this.setState({ selectedNoteIndex: newNoteIndex, selectedNote: this.state.notes[newNoteIndex] });
    console.log(this.state);
  }

}

export default App;
