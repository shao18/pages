import React, {Component} from 'react';
import "Roomlist/css/index.css";
import _ from "lodash";
import PropTypes from "prop-types";
import Swipeable from 'react-swipeable';

class Roomlist extends Component {
  roomTime(room){
     let events;		 
     if(this.props.events.hasOwnProperty(room)){
       console.log("ROOM",room, this.props.events[room]);
	     
       events=this.props.events[room].map((eventItem,id) => <div className="roomlist__room-time-item" key={id}>{eventItem.title}</div>)
     }		 
     return <div className="roomlist__room-time" onClick={this.props.onClick}>{events}</div>;
  }
  render(){
    let res = [];
    for( let floor in this.props.rooms){
       if(this.props.rooms.hasOwnProperty(floor)){
         res.push( <li className="roomlist__floor" key={"f"+floor}>{floor}</li>);
         this.props.rooms[floor].forEach((room,id)=>{
           res.push( <li className="roomlist__room" key={"f"+floor+"_"+id}><div className="room__info"><span className="room__title">{room.title}</span><span className="room__capacity">{room.capacity}</span></div>{this.roomTime(room.id)}</li>);
         });
       }
    }	
    return (<div className="roomlist"> <Swipeable 
	    nodeName="ul" 
	    className="roomlist__rooms"
	    trackMouse={true}
            style={{top:this.props.topShift}}
            onSwipedUp={this.props.onSwipeUp}
	    onSwipedDown={this.props.onSwipeDown}
	    >{res}</Swipeable> </div>); 
  }
}
Roomlist.propTypes = {
   onSwipeUp:PropTypes.func,
   onSwipeDown:PropTypes.func,
   topShift: PropTypes.number,
}
Roomlist.defaultProps = {
  onSwipeUp: (e,x) => {},
  onSwipeDown: (e,x) => { },
  onClick: (e) => {console.log(e.clientX); },	
  topShift: 0,

}

export default  Roomlist;
