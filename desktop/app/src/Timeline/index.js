import React, {Component} from 'react';
import "Timeline/css/index.css";
import _ from "lodash";
import PropTypes from "prop-types";
import Swipeable from 'react-swipeable';
class Timeline extends Component {
  render(){
    const r = _.range(this.props.start,this.props.end);	  
    const times = r.map((hour,id)=>{
      return <li className="timeline__moment" key={id}><span className="timeline__moment-wrapper" style={{width:this.props.hourWidth}}>{(hour<10)?"0":""}{hour}:00</span></li>
    });
    const cursor = <li className="timeline__cursor" key={r.length} style={{left: this.props.cursorX}}><span className="timeline__cursor-wrapper">{this.props.cursor}</span></li>	  
    let style = {left:this.props.leftShift};  
    return (<div className="timeline" ><Swipeable 
	    nodeName="ul"
	    className="timeline__moments"
	    trackMouse={true}
	    onSwipedLeft={this.props.onSwipeLeft.bind(this)}
	    onSwipedRight={this.props.onSwipeRight.bind(this)}
	    style={style}
	    >{times}{cursor}</Swipeable></div>); 
  }
}

Timeline.propTypes = {
   onSwipeLeft:PropTypes.func,
   onSwipeRight:PropTypes.func,
   cursor: PropTypes.string,
   cursorX: PropTypes.number,	
   leftShift: PropTypes.number,	
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
  start: 0,
  end: 23,
  hourWidth: 65,
  cursor: "",
  cursorX: 0,	
	
}

export default  Timeline;
