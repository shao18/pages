import PropTypes from "prop-types";
import React, { Component } from "react";
import "Conversation/css/index.css";
import Button from "Button";
import DateInput from "DateInput";
import Input from "Input";
import Submit from "Submit";
import TimeInput from "TimeInput";
import logo from "Conversation/img/logo.png";
/**
 * Conversation
 */
class Conversation extends Component {
  constructor(props) {
    super(props);
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
            <Input
              placeholder="О чём будете говорить?"
              className="conversation__title"
              label="Тема"
            />
            <DateInput className="conversation__date" label="Дата" />
            <TimeInput className="conversation__start" label="Начало" />
            —
            <TimeInput className="conversation__end" label="Конец" />
            <Input className="conversation__participants" label="Участники" />
            <Input className="conversation__room" label="Ваша переговорка" />
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
