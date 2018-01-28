import React, {Component} from 'react';
import "Timeline/css/index.css";
import _ from "lodash";
import PropTypes from "prop-types";
class Timeline extends Component {
  render(){
    const times = _.range(this.props.start,this.props.end).map((hour,id)=>{
      	    
      return <li className="timeline__moment" key={id}><span className="timeline__moment-wrapper">{(hour<10)?"0":""}{hour}:00</span></li>
    });
      
    return (<div className="timeline"> <ul className=" timeline__moments">{times}</ul> </div>); 
  }
}

export default  Timeline;
