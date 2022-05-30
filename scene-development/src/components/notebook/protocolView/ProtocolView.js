import React, { Component } from "react"
import { connect } from 'react-redux'

import {
    notebookSection,
    incProtocolPage,
    decProtocolPage,
    goProtocolPage,
    setPageInstructions,
    toggleNotesView,
    setModal,
    showModal
} from '../../../actions'

// import ProtocolTask from './protocolTask/ProtocolTask'
import NotesView from './NotesView'

// Styles
import colors from '../../../styles/_colors.scss';
import "./ProtocolView.scss"

//Icons
import IconNotebook from '../../icons/notebook-solid';
import IconHexagon from '../../icons/hexagon-solid';
import IconStart from '../../icons/start-solid';

class ProtocolView extends Component {

    renderProgress = () => {
        return (
          <div>
            <div className="progress">
              {this.renderProgressBar()}
            </div>
            <span className="progress-step">{this.props.currentPage}/{this.props.totalPages}</span>
          </div>
        )
    }

    renderProgressBar = () => {
      //const currentPage = this.props.currentPage

      return (this.props.tasks.map((task, index)=>(
          <div className={"progress-bar"+(this.props.currentPage >= (index + 1)? " active":"")}
            onClick={()=>{
              this.pageInstruction.focus()
              this.taskList.scrollTop = 0
              this.props.goProtocolPage(index + 1)
            }}
            key={index}
            role="progressbar"
            style={{width: (100 / this.props.totalPages)+"%"}}
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100">
          </div>
      )))
    }

    renderPageInstructions = () => {
        if(this.props.tasks.length > 0){
            return (
                <p tabIndex="0" ref={(pageInstruction)=>{this.pageInstruction = pageInstruction}} className="section-instruction">
                  {this.props.currentPage}. {this.props.tasks[this.props.currentPage - 1].instruction}
                </p>
            )
        } else {
            return (
                <p className="section-instruction">
                  0. No tasks found
                </p>
            )
        }
    }

    renderTaskPage = () => {
        if(this.props.tasks.length > 0){
            const currentPage = this.props.currentPage
            //Return list of tasks for rendering

            return (this.props.tasks[currentPage-1].tasks.map((task, index)=>(
                // <ProtocolTask
                //     key={index}
                //     pIndex={currentPage-1}
                //     tIndex={task.index}
                //     level={"l"+this.props.level}
                //     page={currentPage}
                //     />
                <div></div>
            )))
        } else {
            return (
                <div>
                    No tasks yet...
                </div>
            )
        }
    }

    prevBtnClass = () => {
        if(this.props.currentPage !== 1){
            return "protocol-btn"
        } else {
            return "protocol-btn hide"
        }
    }

    blockNextBtn = () => {
        let finalCriteria = true

        // this.props.blotSolutions.forEach(solution => {
        //   finalCriteria = solution.used && finalCriteria
        // });

        return ( this.props.currentPage === this.props.totalPages && !finalCriteria )
    }

    backToNotebook = () => {
        this.props.notebookSection({section: null})
    }

    nextClicked = () => {
        this.props.incProtocolPage()
        this.pageInstruction.focus()
        this.taskList.scrollTop = 0
    }

    prevClicked = () => {
        this.props.decProtocolPage()
        this.pageInstruction.focus()
        this.taskList.scrollTop = 0
    }

    getCurrentTaskIndicator = () => {
      return (
        this.props.focusedPage +
        1 +
        "." +
        String.fromCharCode(97 + this.props.focusedTask)
      );

    }

    // getCurrentTaskPage = () => {
    //   var page = 1;
    //   var task = 1;

    //   for (var i = 0; i < this.props.tasks.length; i++) {
    //     var taskPage = this.props.tasks[i]

    //     if( (this.props.focusedTask + 1) >= task && (this.props.focusedTask + 1) <= (task + taskPage.tasks.length)){
    //       return page;
    //       break;
    //     }
    //     page++;
    //   }
    // }

    showNotesView = () => {
      this.props.toggleNotesView(true);
    }

    componentDidMount() {

      this.props.setModal({
        display: false,
        type: "PROTOCOL_READ",
        size: 'md',
        connect: -1
      })
      this.props.showModal({display: true, shown:true})
    }

    componentDidUpdate(prevProps, prevState){

      if(prevProps.modal.display === true && this.props.modal.display === undefined && this.props.modal.type === "PROTOCOL_READ"){
        this.pageInstruction.focus();
      }
    }

    render() {
        return (
          <div>
            <NotesView/>
            <div className="protocol-view" style={{display: (this.props.notesView)?"none": null}}>
                <div className="protocol-head">
                  <h4>
                    <div className="hexagon">
                      <IconHexagon
                        style={{ position: "absolute", top: "22px", left: "16px", color: 'white', height: '29px'}}
                      />
                    </div>
                    <span className="listIndex">{this.props.index + 1}</span>
                    <button aria-label="Protocol menu button. Select to hide the Protocol instructions and simulation and display the menu."
                        className="protocol-title-btn"
                        onClick={this.backToNotebook}>
                        Protocol
                    </button>
                    <button onKeyDown={(e)=>{if(e.keyCode === 13 || e.keyCode === 32)this.showNotesView()}} onClick={this.showNotesView} aria-label="Notes button. Select to display any notes you’ve made throughout the simulation." className="protocol-notebook-btn">
                      <IconNotebook
                        style={{ color: "white", height: "16px", top: "2px"}}
                      /> Notes
                    </button>
                  </h4>
                </div>
                <div className="protocol-progress-container">
                    {this.renderProgress()}
                    {this.renderPageInstructions()}
                </div>
                <div className="protocol-content" ref={(taskList) => { this.taskList = taskList; }}>
                  <div className="protocol-tasks-container">
                    <ul style={{padding: 0, listStyle: 'none', margin: 0}}>
                      {this.renderTaskPage()}
                    </ul>
                  </div>
                  <div className="protocol-btns-container">
                      <button aria-label="Previous button. Select to display the previous step in the protocol."
                          className={this.prevBtnClass()}
                          onClick={this.prevClicked}
                          style={{visibility: (this.props.currentPage===1)?"hidden":"visible"}}>
                          <IconStart
                            style={{ color: colors.navy1, height: "16px", top: "2px", transform: "rotate(180deg)"}}
                          /> Previous
                      </button>
                      <div className="indicator" onClick={()=>{this.props.goProtocolPage(this.props.focusedPage + 1)}}>
                        <span>{(this.props.focusedPage + 1)+'.'+String.fromCharCode(97 + (this.props.focusedTask))}</span>
                        <IconHexagon
                          style={{ color: colors.navy1, height: '46px'}}
                        />
                      </div>
                      <button
                          aria-label="Next button. Select to display the next step in the protocol."
                          className={'protocol-btn' + (((this.props.focusedPage >= this.props.currentPage) || (this.props.currentPage === this.props.totalPages && this.props.taskPages[this.props.focusedPage].complete === true))?' active':'')}
                          onClick={this.nextClicked}
                          style={{visibility: (this.blockNextBtn() ? "hidden":"visible") }}>
                          <IconStart
                            style={{ color: colors.navy1, height: "16px", top: "2px"}}
                          /> Next
                      </button>
                  </div>
                </div>
            </div>
          </div>
        );
    }
}


ProtocolView.defaultProps = {
    tasks: []
};

const mapStateToProps = (state, ownProps) => {
    return {
        sectionSelected: state.notebook.sectionSelected,
        currentPage: state.notebook.currentProtocolPage,
        totalPages: state.notebook.totalProtocolPages,
        pageInstructions: state.notebook.currentPageInstructions,
        focusedTask: state.notebook.focusedTask,
        focusedPage: state.notebook.focusedPage,
        taskPages: state.notebook.taskPages,
        tasks: ownProps.tasks,
        level: state.notebook.level,
        // blotSolutions: state.blotPaper.blotPapers[0].solutions,
        notesView: state.notebook.notesView,
        modal: state.modal
    }
}

export default connect(mapStateToProps, {
    notebookSection,
    incProtocolPage,
    decProtocolPage,
    goProtocolPage,
    setPageInstructions,
    toggleNotesView,
    setModal,
    showModal
})(ProtocolView);
