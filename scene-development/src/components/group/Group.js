import React, { Component } from 'react';

export default class Group extends Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                left: this.props.position.left,
                top: this.props.position.top }}>
                
                {this.props.components}

            </div>
        );
    }
}            

//Props: components, position

Group.defaultProps = {
    components: [],
    position: {
        left: 10,
        top: 10
    }
};

