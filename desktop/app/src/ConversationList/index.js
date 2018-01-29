import ArrInput from "ArrInput";
import Button from "Button";
import PropTypes from "prop-types";
import "ConversationList/css/index.css";
import React, { Component } from "react";
import Submit from "Submit";
import _ from "lodash";
import logo from "Conversation/img/logo.png";
import Calendar from "Calendar";
import Timeline from "Timeline";
import Roomlist from "Roomlist";
/**
 * ConversationList
 */
class ConversationList extends Component {

  constructor(props) {
    super(props);
    this.state = this.defaultState;

  }
  onTimelineLeft(e,x){
    this.setState({timelineLeftShift: this.state.timelineLeftShift-x});
  }
  onTimelineRight(e,x){
    this.setState({timelineLeftShift: this.state.timelineLeftShift-x});
  }
  onRoomlistUp(e,x){
    /*console.log(e.target.getBoundingClientRect(),window.pageYOffset,window.innerHeight);*/
    this.setState({roomlistTopShift: this.state.roomlistTopShift-x});
  }
  onRoomlistDown(e,x){
    let shift = this.state.roomlistTopShift-x;
    if (shift > 0) shift = 0;
    this.setState({roomlistTopShift: shift});
  }
  	
  headerCreateEvent(){
    
  }
  get defaultState() {
    return {
      timelineLeftShift:  -100,
      roomlistTopShift: 0,	    
    };
  }
  get rooms(){
    return  [
      {
        "id": "1",
        "capacity": 5,
        "floor": 4,
        "title": "404"
      },
      {
        "id": "2",
        "capacity": 4,
        "floor": 2,
        "title": "Деньги"
      },
      {
        "id": "3",
        "capacity": 4,
        "floor": 2,
        "title": "Карты"
      },
      {
        "id": "4",
        "capacity": 2,
        "floor": 2,
        "title": "Ствола"
      },
      {
        "id": "5",
        "capacity": 6,
        "floor": 3,
        "title": "14"
      }
    ]
  }	
  get roomsByFloor(){
     return _.groupBy(this.rooms, room => room.floor ); 
  }	
	

  /**
   * @ignore
   */
  render() {
    	  console.log(this.roomsByFloor);
    return (
      <div className="conversation-list">
        <header className="conversation-list__header">
          <div className="conversation-list__wrapper">
            <img
              src={logo}
              alt="Яндекс Переговорки"
              style={{ height: 25, fontSize: "20px", verticalAlign: "middle" }}
	    />
            
	    <Submit className="conversation-list__create-new" value="Создать встречу" onClick={this.headerCreateEvent.bind(this)}/> 
	    
          </div>
        </header>
        <div className="conversation-list__content">
             <Calendar/><Timeline 
	    start="0" 
	    end="24"
	    onSwipeLeft={this.onTimelineLeft.bind(this)}
	    onSwipeRight={this.onTimelineRight.bind(this)}
	    leftShift={this.state.timelineLeftShift}
	    />
	    <Roomlist 
	    rooms={this.roomsByFloor}
	    topShift={this.state.roomlistTopShift}
	    onSwipeUp={this.onRoomlistUp.bind(this)}
	    onSwipeDown={this.onRoomlistDown.bind(this)}
	    />
        </div>
      </div>
    );
  }
}
export default ConversationList;
