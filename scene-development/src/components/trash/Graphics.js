import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components';
//import { Motion, spring } from 'react-motion';

import { trashFull, trashItem } from '../../actions';

import TrashFull from './img/trash-full.svg'
import TrashEmpty from './img/trash.svg'
import TrashBiohazard from './img/trash-biohazard.svg'
import TrashBiohazardOpen from './img/trash-biohazard-open.svg'

import './Trash.scss'

const images = {
  TrashFull: TrashFull,
  TrashEmpty: TrashEmpty,
  TrashBiohazard: TrashBiohazard,
  TrashBiohazardOpen: TrashBiohazardOpen,
}

class Graphics extends Component {
  componentWillMount() {
    for(var image in images){
      if(!image.replace(this.props.type, '').includes(0)){
        const img = new Image();
        img.src = images[image];
      }
    }
  }

  getImage = ()=>{
    if(this.props.type === "Biohazard"){
      if(this.props.open){
        return images.TrashBiohazardOpen
      } else {
        return images.TrashBiohazard
      }
      
    } else {
      return ((this.props.full)?images[this.props.type+"Full"]:images[this.props.type+"Empty"])
    }
  }

  getClass = () => {
    if(this.props.open){
      return "trash-open"
    } else {
      return "trash-closed"
    }
  }

  render(){
    return(
      <div aria-label="Trash can" className="graphics">
         <img
             className={this.getClass()}
             src={this.getImage()}
             aria-label={'Trash'}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      full: state.trash.full,
      count: state.trash.count,
      type: state.trash.type,
      open: state.trash.open,
    }
}

export default connect(mapStateToProps, {
    trashFull,
    trashItem
})(Graphics)
