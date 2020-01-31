import React from "react";
import ReactQuill from "react-quill";
import debounce from "../../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {
  withStyles
} from "@material-ui/core/styles";
import style from "./style";

class Editor extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    })
  }

  componentDidUpdate() {
    // If Selected NOte CHanged by user update state
    if (this.state.id != this.props.selectedNote.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      })
    }
  }

  render() {
    const { classes, selectedNote } = this.props;
    return (
      <div className={classes.editorContainer}>
        <ReactQuill value={this.state.text} onChange={this.updateBody}></ReactQuill>
      </div>
    );
  }
  updateBody = async (val) => {
    await this.setState({ text: val });
    this.updateDB();
  }

  updateDB = debounce(() => {
    console.log("Updating Database");
  }, 2000);
}

export default withStyles(style)(Editor);