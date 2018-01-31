import ArrInput from "ArrInput";
import Button from "Button";
import DateInput from "DateInput";
import ListInput from "ListInput";
import PropTypes from "prop-types";
import "Conversation/css/index.css";
import React, { Component } from "react";
import Submit from "Submit";
import TimeInput from "TimeInput";
import VInput from "VInput";
import _ from "lodash";
import logo from "Conversation/img/logo.png";
/**
 * Conversation
 */
class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  get defaultState() {
    return {
      title: "",
      dateStart: null,
      timeStart: "",
      timeEnd: "",
      users: {},
      rooms: null,
      searchUser: "",
      roomInfo: null
    };
  }

  reset() {
    this.setState(this.defaultState);
  }

  get dateStartValue() {
    if (this.state.dateStart) {
      const year = this.state.dateStart.getFullYear();
      let month = this.state.dateStart.getMonth() | 0;
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
    this.setState({ title: e.target.value });
  }

  deleteTitleHandler() {
    this.setState({ title: "" });
  }

  onChangeDate(e) {
    const d = /(\d{4})-(\d{2})-(\d{2})/.exec(e.target.value);
    if (d) {
      this.setState({ dateStart: new Date(d[1], d[2] - 1, d[3]) });
    } else {
      this.setState({ dateStart: null });
    }
  }

  onChangeStartTime(e) {
    const t = /(^\d\d:\d\d)/.exec(e.target.value);
    if (t) {
      this.setState({ timeStart: t[1] });
    } else {
      this.setState({ timeStart: null });
    }
  }

  onChangeEndTime(e) {
    const t = /(^\d\d:\d\d)/.exec(e.target.value);
    if (t) {
      this.setState({ timeEnd: t[1] });
    } else {
      this.setState({ timeEnd: null });
    }
  }

  onSelectParticipant(participant, input) {
    const users = _.cloneDeep(this.state.users);
    users[participant.id] = participant;
    this.setState({ users, searchUser: "" });
    input.showDropDown(false);
  }

  onDeleteParticipant(id) {
    delete this.state.users[id];
    this.setState({ users: this.state.users });
  }

  onChangeParticipant(e) {
    this.setState({ searchUser: e.target.value });
  }

  onSelectRoom(room) {
    this.setState({ roomInfo: room });
  }

  onDeleteRoom() {
    this.setState({ roomInfo: null });
  }

  /**
   * @return Array
   */
  get participants() {
    const res = [];
    for (const key in this.state.users) {
      res.push(this.state.users[key]);
    }
    return res;
  }

  hasParticipant(participant) {
    return this.state.users.hasOwnProperty(participant.id);
  }

  matchParticipant(participant) {
    return participant.login.indexOf(this.state.searchUser.trim()) !== -1;
  }

  /**
   * @ignore
   */
  render() {
    return (
      <div className="conversation">
        <header className="conversation__header">
          <div className="conversation__wrapper">
            <img
              src={logo}
              alt="Яндекс Переговорки"
              style={{ height: 25, fontSize: "20px", verticalAlign: "middle" }}
            />
          </div>
        </header>
        <div className="conversation__content">
          <div className="conversation__wrapper">
            <h1 className="h1">
              Новая встреча<a className="conversation__close" />
            </h1>
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
            <span className="conversation__interval conversation__section">
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
            </span>
            <ArrInput
              className="conversation__participants conversation__section"
              label="Участники"
              items={[
                {
                  id: "1",
                  login: "veged",
                  avatarUrl:
                    "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
                  homeFloor: 0
                },
                {
                  id: "2",
                  login: "alt-j",
                  avatarUrl:
                    "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
                  homeFloor: 3
                },
                {
                  id: "3",
                  login: "yeti-or",
                  avatarUrl:
                    "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
                  homeFloor: 2
                }
              ].filter(
                x => !this.hasParticipant(x) && this.matchParticipant(x)
              )}
              onSelect={this.onSelectParticipant.bind(this)}
              onDelete={this.onDeleteParticipant.bind(this)}
              onChange={this.onChangeParticipant.bind(this)}
              value={this.participants}
              search={this.state.searchUser}
            />
            <ListInput
              className="conversation__room conversation__section"
              label="Ваша переговорка"
              items={[
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Готэм ${String.fromCharCode(183)} 4 этаж`
                },
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Поле непаханное ${String.fromCharCode(183)} 4 этаж`
                },
                {
                  start: "16:00",
                  end: "16:30",
                  text: `Тёмная башня ${String.fromCharCode(183)} 4 этаж`
                }
              ]}
              value={this.state.roomInfo}
              onClick={this.onSelectRoom.bind(this)}
              onDelete={this.onDeleteRoom.bind(this)}
            />
            <a href="#" className="conversation__section conversation__remove">
              Удалить встречу
            </a>
          </div>
        </div>
        <footer className="conversation__footer">
          <div className="conversation__wrapper">
            <div className="conversation__error">Выберите переговорку</div>
            <Button
              className="conversation__footer-item"
              value="Отмена"
              onClick={this.reset.bind(this)}
            />
            <Submit
              className="conversation__footer-item"
              value="Создать встречу"
            />
          </div>
        </footer>
      </div>
    );
  }
}
export default Conversation;
