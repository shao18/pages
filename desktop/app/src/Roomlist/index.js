import React, {Component} from 'react';
import "Roomlist/css/index.css";
import _ from "lodash";
import PropTypes from "prop-types";
class Roomlist extends Component {
  render(){
    let res = [];
    for( let floor in this.props.rooms){
       if(this.props.rooms.hasOwnProperty(floor)){
         res.push( <li className="roomlist__floor" key={"f"+floor}>{floor}</li>);
         this.props.rooms[floor].forEach((room,id)=>{
           res.push( <li className="roomlist__room" key={"f"+floor+"_"+id}><div className="room__info"><span className="room__title">{room.title}</span><span className="room__capacity">{room.capacity}</span></div><div className="roomlist__room-time"></div></li>);
         });
       }
    }	
    return (<div className="roomlist"> <ul className=" roomlist__rooms">{res}</ul> </div>); 
  }
}

export default  Roomlist;
