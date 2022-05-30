import React, { Component } from 'react';
import { connect } from 'react-redux';

import Context from './context/Context';
import Materials from './materials/Materials';
// import Predictions from './predictions/Predictions';
import Predictions210 from './predictions/Predictions';
import Results from './results/Results';
import Summary210 from './summary/Summary';
import Reflection from './reflection/Reflection';

import './NotebookPopout.scss'

const sections = [
    "Context",
    "Materials",
    "Predictions",
    "Protocol",
    "Results",
    "Reflection",
    "Summary"
]

class NotebookPopout extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    // Next button aria-label

    nextAriaLabel = () => {
        switch (this.props.section) {
            case "Context":
                return "Next button. Select to advance to the Context section."
            case "Materials":
                return "Next button. Select to advance to the Predictions section.";
            case "Predictions":
                return "Next button. Select to advance to the Results section.";
            case "Results":
                return "Next button. Select to advance to the Summary section.";
            case "Summary":
            return "Next button. Select to advance to the Reflections section.";
            case "Reflection":
            return "";
            default:
                break;
        }
    }

    //TODO: choose which to render based on Redux state
    nextSection = () => {
      if(sections.indexOf(this.props.section) === (sections.length - 1)){
        window.close();
      } else {
        this.props.onSelect({section: sections[sections.indexOf(this.props.section) + 1]});
      }
    }

    render() {
        let body = ''
        switch (this.props.section) {
            case "Context":
                body = <Context />;
                break;
            case "Materials":
                body = <Materials />;
                break;
            case "Predictions":
                body = <Predictions210 />;
                break;
            case "Results":
                body = <Results />;
                break;
            case "Summary":
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
                      <h2 tabIndex={0} aria-label= {"Lab notebook "+ this.props.section +" section heading."}>{this.props.index +". "+ this.props.section}</h2>
                  </div>

                  <div className="popout-body">
                      {body}
                  </div>
                </div>
                <div className="popout-footer">
                    <button tabIndex={this.props.tab} onClick={this.nextSection} className='popout-btn' aria-label={(sections.indexOf(this.props.section) === (sections.length - 1)) ? "End simulation button. Select to end the simulation." : "Next button. Select to advance to the next section."}>
                        {(sections.indexOf(this.props.section) === (sections.length - 1)) ? "End simulation" : "Next section"}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        sectionSelected: state.notebook.sectionSelected,
        onSelect: ownProps.onSelect,
    }
}

export default connect(mapStateToProps, {
})(NotebookPopout);
