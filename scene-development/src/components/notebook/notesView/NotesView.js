/*  Leave this for now - schedule for future sprints
 *  This Notes View is not a dependency for anything else in Notebook
 *  The skeleton code below is a rough first attempt and may be a good starting point
 */



import React, { Component } from "react"
import { connect } from 'react-redux'

import {

} from '../../../actions'
import "./NotesView.css"

class NotesView extends Component {

    backToProtocolView = () => {
        //Probably add Notes view to the core Notebook section choice
        //this.props.notebookSection(null)
    }


    render() {
        return (
            <div className="notes-view">
                <div className="notes-head">
                    <button
                        className="back-protocol-btn"
                        onClick={this.backToProtocolView}>
                        Back to Protocol
                    </button>
                    <h3>Notes</h3>
                </div>

                <div className="notes-container">

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, {

})(NotesView);