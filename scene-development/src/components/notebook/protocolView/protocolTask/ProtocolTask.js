import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";

import { saveTaskNote, setModal, setNoteEntryOpen } from "actions";

// Styles
import colors from "styles/_colors.scss";
import "./ProtocolTask.scss";

//Icons
import IconNotebook from "components/icons/notebook-solid";
import IconHexagon from "components/icons/hexagon-solid";
import IconMore from "components/icons/more-solid";
import IconEdit from "components/icons/pencil-solid";

class ProtocolTask extends Component {
  constructor(props) {
    super(props);

    //TODO: Consider moving this to Redux
    this.state = {
      createNoteView: false,
      readNoteView: false,
      normalView: true,
      menuOpen: false,
      note: ""
    };
  }

  handleClick = e => {
    const domNode = ReactDOM.findDOMNode(this.node);

    if (domNode) {
      if (domNode.contains(e.target)) {
        //Click is inside component
        return;
      }
      // Click is outside component -- close the menu
      this.setState({
        menuOpen: false
      });
    }
  };

    componentDidUpdate(prevProps, prevState){
      if(this.props.page !== prevProps.page){
        this.setState({
          createNoteView: false,
          readNoteView: false,
          normalView: true,
          menuOpen: false,
          note: ''
        })
      }
      if(this.state.menuOpen !== prevState.menuOpen && this.state.menuOpen){
          this.addNote.focus();
      }
      if(this.state.createNoteView !== prevState.createNoteView && this.state.createNoteView){
          this.observations.focus();
      }
    }

    componentWillMount(){
      document.body.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillMount = () => {
      document.body.addEventListener("mousedown", this.handleClick, false);
    };

    componentWillUnmount = () => {
      document.body.removeEventListener("mousedown", this.handleClick, false);
    };

    componentWillReceiveProps(prevProps, prevState) {
      if (prevProps.current !== this.props.current) {
        this.setState({
          createNoteView: false,
          menuOpen: false
        });
      }
    }

  showNotesClicked = () => {
    this.setState({
      readNoteView: !this.state.readNoteView,
      menuOpen: false,
      createNoteView: false
    });
  };

  createNoteClicked = () => {
    this.setState({
      createNoteView: !this.state.createNoteView,
      menuOpen: false,
      readNoteView: false
    });

    console.log(
      this.props.page,
      this.props.pIndex,
      this.props.tIndex,
      this.props.notes
    );

    if (
      this.props.pIndex === 6 &&
      this.props.tIndex === 0 &&
      this.props.notes.length === 0) {

      let text =
        ("The convention when loading a gel is to load it from left to right, please load the DNA ladder in lane 1, the gK- solution in lane 2,  the gK+ solution in lane 3, the gA- solution in lane 4, the gA+ solution in lane 5, and the gLIG solution in lane 6."
        + "\n\nEnter you samples here:"
        + "\n\nLane 1 = "
        + "\n\nLane 2 = "
        + "\n\nLane 3 = "
        + "\n\nLane 4 = "
        + "\n\nLane 5 = "
        + "\n\nLane 6 = ")

      this.setState({
        note: text
      });
    }

    this.props.setNoteEntryOpen({
      open: !this.state.createNoteView
    })
  };

  toggleMenu = () => {
    this.setState({
      readNoteView: false,
      createNoteView: false,
      menuOpen: !this.state.menuOpen
    });
  };

  handleFormChange = e => {
    this.setState({
      note: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({
      menuOpen: false,
      createNoteView: false,
      note: ""
    });

    this.props.saveTaskNote(
      this.state.note,
      this.props.page - 1,
      this.props.tIndex
    );

    this.props.setNoteEntryOpen({
      open: false
    })
  };

  renderTaskModalBtn = () => {
    let btn = "";

    if (this.props.modal === undefined) {
      return "";
    } else {
      //Choose type of button based on modal content
      if (this.props.modal.type === "protocol_table") {
        //Render protocol_table button
        btn = (
          <button
            className={"showTimerInTaskBtn"}
            onClick={e => {
              this.props.setModal({
                display: true,
                type: "PROTOCOL_TABLE_MODAL",
                size: "lg",
                connect: -1,
                data: this.props.modal
              });
            }}
          >
            Show Protocol Table
          </button>
        );
      }

      return btn;
    }

    return btn;
  };

  render() {
    return (
      <li
        className={
          "protocol-task" +
          (this.props.current ? " current-task" : "") +
          (this.props.complete ? " completed-task" : "")
        }
        tabIndex={0}
      >
        <div className="index">
          <IconHexagon
            style={{
              color: this.props.current
                ? "white"
                : this.props.complete
                ? colors.navy3
                : colors.navy1,
              height: "29px"
            }}
          />
          <span style={{ color: this.props.current ? colors.navy1 : "white" }}>
            {this.props.complete
              ? " "
              : String.fromCharCode(97 + this.props.tIndex)}
          </span>
        </div>

        <span aria-label={this.props.aria} className="task-text">
          {this.props.task}{" "}
        </span>
        <button
          className="anchor"
          onClick={this.showNotesClicked}
          style={{
            display:
              !this.state.readNoteView && this.props.notes.length > 0
                ? "initial"
                : "none",
            cursor: "pointer"
          }}
        >
          <IconNotebook
            style={{ color: colors.charcoal1, height: "15px", top: "2px" }}
          />
        </button>

        <div className="trigger-btn-wrap"> {this.renderTaskModalBtn()} </div>

        <div className="protocol-menu"
          ref={node => this.node = node}>
          <button
            className="toggle-menu anchor"
            onClick={this.createNoteClicked}
            aria-label="Notes. Select to view the options."
          >
            <IconEdit
              style={{ color: colors.navy1, height: '16px', top: '10px', right: '10px'}}
            />
            <p style={{display: "none"}}>Toggle menu</p>
          </button>
          {/* <Collapse
            isOpened={this.state.menuOpen}
            aria-hidden={!this.state.menuOpen}
            theme={{ collapse: 'collapse', content: 'collapse-content' }}
            style={{ position: 'absolute' }}
            springConfig={{ stiffness: 500, damping: 30 }}>

            <button
              className="anchor"
              onClick={this.createNoteClicked}
              tabIndex={(this.state.menuOpen) ? null : -1}>
              Add Note
            </button>
          </Collapse> */}
        </div>

        <Collapse
          isOpened={this.state.readNoteView}
          aria-hidden={!this.state.readNoteView}
          theme={{ collapse: "collapse", content: "collapse-content" }}
          springConfig={{ stiffness: 500, damping: 30 }}
        >
          <div className="notes-content">
            <div className="notes">
              <p>Notes:</p>
              <ul>
                {this.props.notes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </ul>
            </div>
            <button
              className="anchor"
              onClick={this.showNotesClicked}
              tabIndex={this.state.readNotesView ? null : -1}
            >
              Hide
            </button>
          </div>
        </Collapse>

        <Collapse
          isOpened={this.state.createNoteView}
          aria-hidden={!this.state.createNoteView}
          style={{display: (!this.state.createNoteView)?"none": null}}>
          <form
            className="add-note-panel"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <p>Observations:</p>
            <textarea
              aria-label="Add observations text-entry field. Input text to add a note to this instruction."
              placeholder="Add observations"
              ref={(observations) => {this.observations = observations}}
              value={this.state.note !== null ? this.state.note : ""}
              onChange={this.handleFormChange}
              tabIndex={this.state.createNoteView ? null : -1}
            />
            <div className="btns">
              <button
                aria-label="Cancel button. Select to discard changes you’ve made to your notes."
                className="anchor"
                onClick={this.createNoteClicked}
                tabIndex={this.state.createNoteView ? null : -1}
              >
                Cancel
              </button>
              <button
                aria-label="Save note button. Select to save changes you’ve made to your notes."
                type="submit"
                tabIndex={this.state.createNoteView ? null : -1}
                onClick={this.handleFormSubmit}
              >
                Save note
              </button>
            </div>
          </form>
        </Collapse>
      </li>
    );
  }
}

ProtocolTask.defaultProps = {
  notes: []
};

const mapStateToProps = (state, ownProps) => {
    return {
        pIndex: ownProps.pIndex,
        tIndex: ownProps.tIndex,
        level: ownProps.level,
        page: ownProps.page,
        task: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].levels[ownProps.level].task,
        action: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].action,
        notes: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].notes,
        criteria: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].levels[ownProps.level].criteria,
        complete: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].complete,
        current: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].current,
        aria: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].aria,
        modal: state.notebook.taskPages[ownProps.pIndex].tasks[ownProps.tIndex].levels[ownProps.level].modal,
    }
}

export default connect(
  mapStateToProps,
  {
    saveTaskNote,
    setModal,
    setNoteEntryOpen
  }
)(ProtocolTask);
