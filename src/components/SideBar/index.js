import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItems from '../SideBarItems';

class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: false
        }
    }
    render() {
        const { classes, notes, selectedNoteIndex } = this.props;
        return (
            <div className={classes.sidebarContainer}>
                <Button
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}>
                    {this.state.addingNote ? 'Cancel' : 'New Note'}
                </Button>
                {
                    this.state.addingNote ?
                        <div>
                            <input
                                className={classes.newNoteInput}
                                type="text" placeholder="Enter Note Title" onKeyUp={(e) => this.updateTitle(e.target.value)}>
                            </input>
                            <Button className={classes.newNoteSubmitButton} onClick={this.submitNote}>Submit</Button>
                        </div>
                        : null

                }
            </div>
        );
    }

    newNoteBtnClick = () => {
        this.setState({ addingNote: !this.state.addingNote, title: null });
    }
    updateTitle = (title) => {
        this.setState({ title })
    }
    submitNote = () => {
        console.log(this.state);
        console.log("submit clikced");
    }
}

export default withStyles(style)(SideBar);