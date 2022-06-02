import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";
import {
    notebookSection,
    notebookPopout,
    setTotalProtocolPages,
    toggleNotebookExpanded
} from '../../actions';
import NotebookSection from "./notebookSection/NotebookSection";
import ProtocolView from "./protocolView/ProtocolView";
import "./Notebook.scss";
import NotebookIcon from "./img/notebook-icon.svg";
import NotebookIconHover from "./img/notebook-icon-hover.svg";
import NotebookIconCollapse from "./img/notebook-icon-collapse.svg";
import IconStar from "../icons/star-solid"
export const sections = [
  "Introduction",
  "Resources",
  "Simulation",
  "Review",
  "Feedback",
  "Reflection",
];

//This component coordinates all the Notebook logic and data flow
class Notebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notebookIconHover: false,
      section: "Open"
    };
  }

  onSectionSelect = (section) => {
    this.setState({
      section: section.section
    })
    this.props.setState(section.section)
    // console.log(section)
    if (section.section !== "Protocol") {
      if (section.section === this.props.sectionSelected) {
        this.props.notebookPopout(!this.props.sliderOpen);
      } else {
        if (
          this.props.sectionSelected === false ||
          this.props.sectionSelected === null
        ) {
          notebookPopout(!this.props.sliderOpen);
        }
      }
    } else if (section.section === "Protocol") {
      //Setting total pages in prep for rendering Protocol View
      if (this.props.taskPages.length > 0) {
        setTotalProtocolPages(this.props.taskPages.length);
      }

      notebookPopout(false);
    }
    // Open the collapse
    notebookSection(section);

    // If the section is the currently open section
    if (section.section === this.props.sectionSelected) {
      // Close the collapse
      notebookSection({ section: false });
    }
  };

  //Render list first - then protocol if clicked
  renderSectionList = () => {
    return sections.map((text, index) => (
      <NotebookSection
        text={text}
        onSelect={this.onSectionSelect}
        focused={text === this.props.sectionSelected}
        key={text}
        index={index + 1}
      />
      // <div></div>
    ));
  };

  renderProtocolView = () => {
    return (
      <ProtocolView key={1} tasks={this.props.taskPages} index={3} />
      // <div></div>
    );
  };

  openSlider = () => {
    notebookPopout(!this.props.sliderOpen)
  };

  toggleExpanded = (e) => {
    //   this.props.toggleNotebookExpanded()
  };

  render() {
    return (
      <div
        id="notebook"
        tabIndex={-1}
        className={
          (this.props.sliderOpen ? "open" : "closed") +
          " " +
          (this.props.notebookExpanded ? "expanded" : "")
        }
      >
        <div id="notebook-head">
          <img
            src={
              // this.props.notebookExpanded
              //   ? this.state.notebookIconHover
              //     ? NotebookIconHover
              //     : NotebookIcon
              //   : NotebookIconCollapse
              NotebookIconCollapse
            }
            alt="Notebook display button. Select to show or hide the notebook."
            className="notebook-icon"
            onClick={(e) => {
              this.props.setStateOpenClose("close")
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.keyCode === 32) this.toggleExpanded(e);
            }}
            tabIndex="0"
            onMouseEnter={() => {
              this.setState({
                notebookIconHover: true,
              });
            }}
            onMouseOut={() => {
              this.setState({
                notebookIconHover: false,
              });
            }}
          />
          <h6 tabIndex={-1} aria-label="Notebook" id="notebook-title">
            Notebook
          </h6>
        </div>
        <div
          tabIndex={-1}
          className="notebook-body"
          style={{ display: this.props.notebookExpanded ? null : "none" }}
        ></div>
        <FocusLock
          disabled={
            this.props.sectionSelected === "Simulation" || this.props.modalVisible
          }
        >
          {/* {this.state.section === "Simulation"
            ? this.renderProtocolView()
            : this.renderSectionList()} */}
            {this.renderSectionList()}
        </FocusLock>
        
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         sectionSelected: state.notebook.sectionSelected,
//         sliderOpen: state.notebook.sliderOpen,
//         taskPages: state.notebook.taskPages,
//         modalVisible: state.modal.display,
//         notebookExpanded: state.scene.notebookExpanded,
//     }
// }

// export default connect(mapStateToProps, {
//     notebookSection,
//     notebookPopout,
//     setTotalProtocolPages,
//     toggleNotebookExpanded
// })(Notebook);
export default Notebook;
