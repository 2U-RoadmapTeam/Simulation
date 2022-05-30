import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-collapse'
//import { notebookPopout } from 'actions';
import NotebookPopout from '../notebookPopout/NotebookPopout'


// Styles
import colors from '../../../styles/_colors.scss';
import './NotebookSection.scss'

// Icons
import IconHexagon from '../../icons/hexagon-solid';

class NotebookSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    sectionClicked = () => {
        this.props.onSelect({section: this.props.text});
    }

    onSelect = (section) => {
      return this.props.onSelect(section);
    }

    render() {

        return (
            <div tabIndex={-1} className="notebook-section card">
                <div tabIndex={-1}className={'card-header'+(this.props.focused?" active":"")}>
                    <div className="arrow"></div>
                    <h4 tabIndex={-1}className="incomplete" aria-label={this.props.text + 'heading'}>
                      <IconHexagon
                        style={{position: 'absolute', color: (this.props.focused)? 'white': colors.navy1, height: (this.props.focused)? '32px': '15px', top: (this.props.focused)? '15px': '24px', left: (this.props.focused)? '15px': '22px'}}
                      />
                      <p tabIndex={-1}className="listIndex">{this.props.index} </p>
                      <button aria-label= {this.props.text +" menu button. Select to enter the "+ this.props.text + ' menu pane.'}
                        className="btn btn-link" tabIndex={0} onClick={this.sectionClicked}>
                        {this.props.text}
                      </button>
                    </h4>
                </div>

                <div
                  tabIndex={-1} className={"collapse-wrapper " + this.props.text}>
                  <Collapse
                      isOpened={this.props.focused}
                      aria-hidden={!this.props.focused}
                      theme={{collapse: 'collapse', content: 'collapse-content'}}
                      springConfig={{stiffness: 500, damping: 30}}>
                        {(this.props.focused)?<NotebookPopout onSelect={this.onSelect} index={this.props.index} section={this.props.text} tab={(this.props.focused)? null: -1}/>:null}
                  </Collapse>
              </div>
            </div>
        );
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         text: ownProps.text,
//         onSelect: ownProps.onSelect,
//         focused: ownProps.focused,
//         sliderOpen: state.notebook.sliderOpen,
//         sectionSelected: state.notebook.sectionSelected
//     }
// }

// export default connect(mapStateToProps, {

// })(NotebookSection);

export default NotebookSection;