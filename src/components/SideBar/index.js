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
        if (notes) {
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


                    <List>
                        {
                            notes.map(
                                (_note, _index) => {
                                    console.log(_note);
                                    return (<div key={_index}>
                                        <SidebarItems
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        />
                                    </div>);
                                }
                            )
                        }
                    </List>
                    <Divider></Divider>

                </div >
            );
        } else {
            return (<div>Loading...</div>);
        }
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
    deleteNote = () => console.log("Delete Note");
    selectNote = () => console.log("selectNote");
}

export default withStyles(style)(SideBar);