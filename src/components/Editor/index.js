import React from "react";
import ReactQuill from "react-quill";
import debounce from "../../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {
  withStyles
} from "@material-ui/core/styles";
import style from "./style";

class Editor extends React.Component {
  render() {
    return "Hey I am Editor COmponent";
  }
}

export default withStyles(style)(Editor);