import React, { Component } from 'react'
import Graphics from 'components/blottingPaper/Graphics';
import './BlottingPaper.scss';


class BlottingPaper extends Component {

    increacsePrediction = () =>{
        this.props.incPrediction({id: this.props.id, incPrediction: true})
    }
    render()
    {
        return (
          <ul>
            <li
              style={{marginTop: '-30px', paddingTop: '30px'}}
              aria-label = "White sheet with four sections (labeled A, B, C, D)."
                tabIndex={0}
                className='BlottingPaper'>
                <p className="label" aria-hidden="true">Blotting Paper</p>
                <Graphics id={this.props.id} />
            </li>
          </ul>
        )
    }
}

export default (BlottingPaper);
