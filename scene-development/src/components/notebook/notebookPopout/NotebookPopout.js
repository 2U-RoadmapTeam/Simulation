import React, { Component } from "react";
import { connect } from "react-redux";

import Introduction from "./introduction/Introduction";
import Materials from "./resources/Resources";
// import Predictions from 'components/notebook/notebookPopout/predictions/Predictions';
import Predictions210 from "./predictions/Predictions";
import Review from "./review/Review";
import Summary210 from "./summary/Summary";
import Reflection from "./reflection/Reflection";
import Simulation from "./simulation/Simulation";
import "./NotebookPopout.scss";

const sections = [
  "Introduction",
  "Resources",
  "Simulation",
  "Review",
  "Feedback",
  "Reflection",
];

class NotebookPopout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Next button aria-label

  nextAriaLabel = () => {
    switch (this.props.section) {
      case "Introduction":
        return "Next button. Select to advance to the Context section.";
      case "Resources":
        return "Next button. Select to advance to the Predictions section.";
      case "Predictions":
        return "Next button. Select to advance to the Results section.";
      case "Simulation":
        return "Next button. Select to advance to the Simulation section.";
      case "Review":
        return "Next button. Select to advance to the Summary section.";
      case "Feedback":
        return "Next button. Select to advance to the Reflections section.";
      case "Reflection":
        return "";
      default:
        break;
    }
  };

  //TODO: choose which to render based on Redux state
  nextSection = () => {
    //   console.log("Hello")
    let nextSection = sections.indexOf(this.props.sectionSelected) + 1;
    if(this.props.sectionSelected === sections[sections.length-1]){
        this.props.setState(sections[0]);
    }
    else{
        this.props.setState(sections[nextSection]);
    }
    // if (sections.indexOf(this.props.section) === sections.length - 1) {
    //   window.close();
    // } else {
    //   this.props.onSelect({
    //     section: sections[sections.indexOf(this.props.section) + 1],
    //   });
    // }
  };

  render() {
    let body = "";
    switch (this.props.sectionSelected) {
      case "Introduction":
        body = <Introduction />;
        break;
      case "Resources":
        body = <Materials />;
        break;
      case "Simulation":
        body = <Simulation />;
        break;
      case "Review":
        body = <Review />;
        break;
      case "Feedback":
        body = <Summary210 />;
        break;
      case "Reflection":
        body = <Reflection />;
        break;
      default:
        break;
    }
    return (
      <div className="notebook-popout">
        <div className="popout-content">
          <div className="popout-header">
            <h2
              tabIndex={0}
              aria-label={
                "Lab notebook " +
                this.props.sectionSelected +
                " section heading."
              }
              className="header"
            >
              {this.props.index + ". " + this.props.sectionSelected}
            </h2>
          </div>

          <div className="popout-body">{body}</div>
        </div>
        <div className="popout-footer">
          <button
            tabIndex={this.props.tab}
            onClick={this.nextSection}
            className="popout-btn"
            aria-label={
              sections.indexOf(this.props.sectionSelected) === sections.length - 1
                ? "End simulation button. Select to end the simulation."
                : "Next button. Select to advance to the next section."
            }
          >
            {sections.indexOf(this.props.sectionSelected) === sections.length - 1
              ? "End simulation"
              : "Next section"}
          </button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         index: ownProps.index,
//         sectionSelected: state.notebook.sectionSelected,
//         onSelect: ownProps.onSelect,
//     }
// }

// export default connect(mapStateToProps, {
// })(NotebookPopout);

export default NotebookPopout;
