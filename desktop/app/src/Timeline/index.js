import React, {Component} from 'react';
import "Timeline/css/index.css";
import _ from "lodash";
import PropTypes from "prop-types";
import Swipeable from 'react-swipeable';
class Timeline extends Component {
  render(){
    const times = _.range(this.props.start,this.props.end).map((hour,id)=>{
      	    
      return <li className="timeline__moment" key={id}><span className="timeline__moment-wrapper">{(hour<10)?"0":""}{hour}:00</span></li>
    });
    let style = {left:this.props.leftShift};  
    return (<div className="timeline" ><Swipeable 
	    nodeName="ul"
	    className="timeline__moments"
	    trackMouse={true}
	    onSwipedLeft={this.props.onSwipeLeft.bind(this)}
	    onSwipedRight={this.props.onSwipeRight.bind(this)}
	    style={style}
	    >{times} </Swipeable></div>); 
  }
}

Timeline.propTypes = {
   onSwipeLeft:PropTypes.func,
   onSwipeRight:PropTypes.func,
   leftShift: PropTypes.string,	
}
Timeline.defaultProps = {
  onSwipeLeft: (e,x) => {
	  console.log("left", e, x);
  },
  onSwipeRight: (e,x) => {
     console.log("right", e, x);
  },
  onSwipe : (e)=>{
    console.log(["swipe",e]);
  },
  leftShift: -300,
	
}

export default  Timeline;
