import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultipleChoiceQuestion from '../../../questions/multipleChoiceQuestion/MultipleChoiceQuestion';
import SingleChoiceQuestion from '../../../questions/singleChoiceQuestion/SingleChoiceQuestion';
// import DragAndDropQuestion from '../../../questions/multipleChoiceQuestion/DragAndDropQuestion';
import ReflectionData from '../../../../data/notebook.json';

import {
    createMCQ,
    createSCQ,
    //createDND,
} from '../../../../actions';

import colors from '../../../../styles/_colors.scss';

class Reflection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            components: []
        }
    }

    componentDidMount(){
        this.doReduxPart(ReflectionData.Notebook.Content.Reflection)
        this.doCompPart(ReflectionData.Notebook.Content.Reflection)
    }

    doReduxPart = (data) => {
        data.components.forEach(comp => {
            this.setupComponentRedux(comp)
        })
    }

    doCompPart = (data) => {
        let compArr = []

        data.components.forEach((comp, index) => {
          let componentData = [];

          if((index + 1) === data.components.length){
            componentData.push(
              <div>

                <h2 style={{margin: '32px 0 8px'}}>Feedback question</h2>
                <div style={{width: '100%', height: '1px', background: colors.navy1, marginTop: '8px'}}></div>
              </div>
            )
          }
          componentData.push(this.buildComponent(comp, index))
          compArr.push(componentData)
        })

        this.setState({
            components: compArr
        })
    }

    setupComponentRedux = (data) => {
        switch (data.component) {
            case "MCQ":
                this.props.createMCQ({
                  id: data.props.id,
                  type: data.props.type,
                  choices: data.props.levels['l'+this.props.level].choices,
                  label: data.props.levels['l'+this.props.level].label,
                  attempts: data.props.levels['l'+this.props.level].attempts,
                  answer: data.props.levels['l'+this.props.level].answer,
                  correct: data.props.levels['l'+this.props.level].correct,
                  image: (typeof data.props.levels['l'+this.props.level].image !== 'undefined')?data.props.levels['l'+this.props.level].image:null
                })
                break;

            case "SCQ":
                this.props.createSCQ({
                  id: data.props.id,
                  type: data.props.type,
                  choices: data.props.levels['l'+this.props.level].choices,
                  label: data.props.levels['l'+this.props.level].label,
                  attempts: data.props.levels['l'+this.props.level].attempts,
                  answer: data.props.levels['l'+this.props.level].answer,
                  correct: data.props.levels['l'+this.props.level].correct,
                  image: data.props.levels['l'+this.props.level].image,
                  ariaLabel: data.props.levels['l'+this.props.level].ariaLabel
                })
                break;
            //
            // case "DND":
            //     this.props.createDND({
            //         id: data.props.id,
            //         type: data.props.type,
            //     })
                break;

            default:
                break;
        }
    }

    buildComponent = (data, index) => {
        switch (data.component) {
            case "MCQ":
                return (<MultipleChoiceQuestion key={index} type={data.props.type} id={data.props.id} index={index}/>)

            case "SCQ":
                return (<SingleChoiceQuestion key={index} type={data.props.type} id={data.props.id} index={index}/>)

            // case "DND":
            //     return (<DragAndDropQuestion key={index} pos={data.position} type={data.props.type} id={data.props.id} />)

            default:
                break;
        }
    }

    render() {
        return (
          <div>
            <p tabIndex={0}>Let’s look at what you learned from this simulation. Please click on your answer to each of the following questions to save them in your notebook.</p>
            <div>
              {this.state.components}
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      level: 1
    }
  }

  export default connect(mapStateToProps, {
    createMCQ,
    createSCQ,
    //createDND,
  })(Reflection)

// export default function Reflection() {
//   return (
//     <div>
//       <h1>Page Under Construction</h1>
//     </div>
//   );
// }
