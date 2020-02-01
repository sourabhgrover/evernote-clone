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
          deleteNote={this.deleteNote}
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
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newNoteFirebase.id)[0])
    this.setState({ selectedNoteIndex: newNoteIndex, selectedNote: this.state.notes[newNoteIndex] });
  }

  // Delete Note
  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);

    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });

    // If  deleting selected note
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null })
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    // Delete Note from FIrebase
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

}

export default App;
