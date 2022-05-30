import { React, Component } from "react";
import { connect } from "react-redux";
import {
  notebookSection,
  notebookPopout,
  setTotalProtocolPages,
  toggleNotebookExpanded,
} from "../../actions";
import NotebookSection from "./NoteBookSection/NotebookSection";
import "./Notebook.scss";
import ProtocolView from "./protocolView/ProtocolView";
import NotebookIcon from "./img/notebook-icon.svg";
import NotebookIconHover from "./img/notebook-icon-hover.svg";
import NotebookIconCollapse from "./img/notebook-icon-collapse.svg";
// import FocusLock from 'react-focus-lock'

const sections = [
  "Context",
  "Materials",
  "Predictions",
  "Protocol",
  "Results",
  "Reflection",
  "Summary",
];

//This component coordinates all the Notebook logic and data flow
class Notebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notebookIconHover: false,
    };
    // this.props.sectionSelected = "Protocol";

  }
  onSectionSelect = (section) => {
    console.log(section);
    if (section.section !== "Protocol") {
      if (section.section === this.props.sectionSelected) {
        // this.props.notebookPopout(!this.props.sliderOpen)
        notebookPopout(!Notebook.sliderOpen);
      } else {
        if (
          this.props.sectionSelected === false ||
          this.props.sectionSelected === null
        ) {
          this.props.notebookPopout(!this.props.sliderOpen);
        }
      }
    } else if (section.section === "Protocol") {
      //Setting total pages in prep for rendering Protocol View
      //   if(this.props.taskPages.length > 0){
      //       this.props.setTotalProtocolPages(this.props.taskPages.length)
      //   }

      notebookPopout(false);
    }
    // Open the collapse
    // this.props.notebookSection(section);
    notebookSection(section);

    // If the section is the currently open section
    if (section.section === this.props.sectionSelected) {
      // Close the collapse
      this.props.notebookSection({ section: false });
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
      // <div>
      //     <h1>text</h1>
      // </div>
    ));
  };

  renderProtocolView = () => {
    return <ProtocolView key={1} tasks={this.props.taskPages} index={3} />;
  };

  openSlider = () => {
    this.props.notebookPopout(!this.props.sliderOpen);
  };

  toggleExpanded = (e) => {
    toggleNotebookExpanded();
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
              this.props.notebookExpanded
                ? this.state.notebookIconHover
                  ? NotebookIconHover
                  : NotebookIcon
                : NotebookIconCollapse
            }
            alt="Notebook display button. Select to show or hide the notebook."
            className="notebook-icon"
            onClick={(e) => {
              this.toggleExpanded(e);
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
          <h6 tabIndex={-1} id="notebook-title">
            Notebook
          </h6>
        </div>
        <div
          tabIndex={-1}
          className="notebook-body"
          style={{ display: this.props.notebookExpanded ? null : "none" }}
        >
          {/* <FocusLock disabled={this.props.sectionSelected === 'Protocol' || this.props.modalVisible}> */}
        </div>
        {/* {this.renderSectionList()} */}
        {this.props.sectionSelected === "Protocol"
          ? this.renderProtocolView()
          : this.renderSectionList()}
        {/* {this.renderProtocolView()} */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        sectionSelected: state.notebook.sectionSelected,
        sliderOpen: state.notebook.sliderOpen,
        taskPages: state.notebook.taskPages,
        modalVisible: state.modal.display,
        notebookExpanded: state.scene.notebookExpanded,
    }
}

export default connect(mapStateToProps, {
    notebookSection,
    notebookPopout,
    setTotalProtocolPages,
    toggleNotebookExpanded
})(Notebook);

// export default Notebook;
