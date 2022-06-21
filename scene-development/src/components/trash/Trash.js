import React, { Component } from 'react'
import { connect } from 'react-redux';
import Graphics from 'components/trash/Graphics';

import { setTrashOpen } from '../../actions';

import './Trash.scss'

class Trash extends Component {

    toggleOpen = () => {
        this.props.setTrashOpen({
            open: !this.props.open
        })
    }

    render() {
        return (
            <ul>
                <li aria-label="Biohazardous waste"
                  id="Trash" tabIndex={0}
                  className="dropTarget"
                  onClick={this.toggleOpen}>
                    <p className="label" style={{ bottom: (this.props.open ? "calc(100% - -50px)" : ""), left: (this.props.open ? "42%" : "")}} >{(this.props.type === "Biohazard")? "Biohazardous Waste": "Trash"}</p>
                    <Graphics id={this.props.id}/>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      open: state.trash.open,
      type: state.trash.type
    }
}

export default connect(mapStateToProps, {
    setTrashOpen
})(Trash)
