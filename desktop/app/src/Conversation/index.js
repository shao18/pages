import ArrInput from "ArrInput";
import "Conversation/css/index.css";
import Button from "Button";
import DateInput from "DateInput";
import ListInput from "ListInput";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Submit from "Submit";
import TimeInput from "TimeInput";
import VInput from "VInput";
import logo from "Conversation/img/logo.png";
/**
 * Conversation
 */
class Conversation extends Component {
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      title: "",
      dateStart: null,
      timeStart: null,
      timeEnd: null,
      users: [],
      rooms: null
    };	  
  }

  get dateStartValue() {
    if(this.state.dateStart){
      const year = this.state.dateStart.getFullYear();
      let month = this.state.dateStart.getMonth() |0;
      month++;
      if (month < 10) month = `0${month}`;
      let day = this.state.dateStart.getDate();
      if (day < 10) day = `0${day}`;
      return `${year}-${month}-${day}`; 
    }	     
  }

  get startTimeValue() {
    return this.state.timeStart;	  
  }

  get endTimeValue() {
    return this.state.timeEnd;
  }
	
  changeTitleHandler(e) {
    this.setState({title: e.target.value });
  }

  deleteTitleHandler() {
    this.setState({ title: "" }, () => {
      console.log(this.state);
    });
  }

  onChangeDate(e) {
    const d = /(\d{4})-(\d{2})-(\d{2})/.exec(e.target.value);
    if (d) {
      this.setState({ dateStart: new Date(d[1], d[2] - 1, d[3]) }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ dateStart: null }, () => {
        console.log(this.state);
      });
    }
  }

  onChangeStartTime(e) {
    const t = /(^\d\d:\d\d)/.exec(e.target.value);
    if (t) {
      this.setState({timeStart: t[1]});
    } else {
      this.setState({timeStart: null});     
    }
  }

  onChangeEndTime(e) {
    const t = /(^\d\d:\d\d)/.exec(e.target.value);
    if (t) {
      this.setState({timeEnd: t[1]},()=>console.log(this.state));
    } else {
      this.setState({timeEnd: null});     
    }
  }

  onSelectParticipant(participant, input) {
    this.state.users.push(participant);
    this.setState({ users: this.state.users }, () => {
      console.log(this.state.users);
    });
    input.showDropDown(false);
  }

  get participants() {
    return this.state.users;
  }
	
  /**
   * @ignore
   */
  render() {
    return (
      <div className="conversation">
        <header className="conversation__header">
          <img
            src={logo}
            alt="Яндекс Переговорки"
            style={{ height: 25, fontSize: "20px" }}
          />
        </header>
        <div className="conversation__content">
          <div className="conversation__wrapper">
            <h1 className="h1">Новая встреча</h1>
            <VInput
              placeholder="О чём будете говорить?"
              className="conversation__title"
              label="Тема"
              onChange={this.changeTitleHandler.bind(this)}
              onDelete={this.deleteTitleHandler.bind(this)}
              value={this.state.title}
            />
            <DateInput
              className="conversation__date"
              label="Дата"
              onChange={this.onChangeDate.bind(this)}
              value={this.dateStartValue}
            />
            <TimeInput
              className="conversation__start"
              label="Начало"
              onChange={this.onChangeStartTime.bind(this)}
              value={this.startTimeValue}
            />
            —
            <TimeInput
              className="conversation__end"
              label="Конец"
              onChange={this.onChangeEndTime.bind(this)}
              value={this.endTimeValue}
            />
            <ArrInput
              className="conversation__participants"
              label="Участники"
              items={
              [{
                "id": "1",
                "login": "veged",
                "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
                "homeFloor": 0
                },
              {
                "id": "2",
                "login": "alt-j",
                "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
                "homeFloor": 3
                },
              {
                "id": "3",
                "login": "yeti-or",
                "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
                "homeFloor": 2
                }
              ]
	    }
              onSelect={this.onSelectParticipant.bind(this)}
              value={this.participants}
            />
            <ListInput
              className="conversation__room"
              label="Ваша переговорка"
              items={[
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Готэм ${  String.fromCharCode(183)  } 4 этаж`,         
                },
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Поле непаханное ${  String.fromCharCode(183)  } 4 этаж`,       
                },
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Тёмная башня ${  String.fromCharCode(183)  } 4 этаж`,          
                },
              ]}/>
          </div>
        </div>
        <footer className="conversation__footer">
          <Button className="conversation__footer-item" value="Отмена" />
          <Submit
            className="conversation__footer-item"
            value="Создать встречу"
          />
        </footer>
      </div>
    );
  }
}
export default Conversation;
