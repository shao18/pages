import AbstractInput from "AbstractInput";
import PropTypes from "prop-types";
import React from "react";
import "ArrInput/css/index.css";
/**
 * ArrInput
 */
class ArrInput extends AbstractInput {
  constructor(params) {
    super(params);
    this.state = {
      showDropDown: this.props.showDropDown
    };
  }

  /*
   * @param {string} state  True for show, false for hide
   */
  showDropDown(state, callback) {
    this.setState({ showDropDown: Boolean(state) }, callback);
  }

  onFocus() {
    this.showDropDown(true);
  }

  onKeyDown(e, input) {
    if (this.state.showDropDown && e.keyCode === 27) {
      this.showDropDown(false);
    } else {
      this.showDropDown(true);
    }
  }

  /**
   * Handle for click  DropDown item
   */
  onSelect(event, participant) {}

  /**
   * Return DropDown part of input
   */
  get list() {
    let items;
    if (this.props.items.length > 0) {
      items = this.props.items.map((item, key) => {
        let img;
        if (item.hasOwnProperty("avatarUrl"))
          img = (
            <img
              src={item.avatarUrl}
              alt=""
              className={`${this.blockName}__item-img`}
            />
          );
        let floor;
        if (item.hasOwnProperty("homeFloor")) {
          floor = (
            <span className={`${this.blockName}__item-floor`}>
              {String.fromCharCode(183)} {item.homeFloor} этаж
            </span>
          );
        }
        return (
          <li
            key={key}
            className={`${this.blockName}__item`}
            onClick={this.props.onSelect.bind(null, item, this)}
          >
            {img} {item.login} {floor}
          </li>
        );
      });
      let cn = `${this.blockName}__list`;
      cn += ` ${cn}_show_${this.state.showDropDown ? "true" : "false"}`;

      return <ul className={cn}>{items}</ul>;
    }
    return null;
  }

  /**
   * Return list of deletable values
   * @param {Array} itemsArray List of array items
   * @param {string} mod Postfix of list class
   */
  listDeletable(itemsArray, mod) {
    let items;
    if (itemsArray.length > 0) {
      items = itemsArray.map((item, key) => {
        let img;
        if (item.hasOwnProperty("avatarUrl"))
          img = (
            <img
              src={item.avatarUrl}
              alt=""
              className={`${this.blockName}__item-img${mod}`}
            />
          );

        return (
          <li key={key} className={`${this.blockName}__item${mod}`}>
            {img}{" "}
            <span className={`${this.blockName}__item${mod}-wrap`}>
              {item.login}
            </span>{" "}
            <a
              className={`${this.blockName}__item-remove${mod}`}
              onClick={this.props.onDelete.bind(null, item.id)}
            />
          </li>
        );
      });
      return <ul className={`${this.blockName}__list${mod}`}>{items}</ul>;
    }
    return null;
  }

  /**
   * @ignore
   */
  render() {
    let classList = "";
    if (this.props.className !== "") {
      classList = ` ${this.props.className}`;
    }
    return (
      <div
        className={
          this.blockName +
          (this.props.state !== "normal"
            ? ` ${this.blockName}__state_${this.props.state}`
            : "") +
          classList
        }
        onClick={this.clickWrapper.bind(this)}
      >
        {this.label}
        <input
          id={this.id}
          className={this._inputClass}
          type={this.inputType}
          disabled={this.props.state === "disabled"}
          placeholder={this.props.placeholder}
          onFocus={this.onFocus.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.props.onChange}
          value={this.props.search}
        />
        {this.list}
        {this.listDeletable(this.props.value, "-deletable")}
      </div>
    );
  }
}
ArrInput.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.array,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  showDropDown: PropTypes.bool,
  search: PropTypes.string
};
ArrInput.defaultProps = {
  valueType: "single",
  value: [],
  search: "",
  state: "normal",
  className: "",
  placeholder: "",
  id: null,
  label: "",
  items: [],
  showDropDown: false,
  onSelect: () => {},
  onDelete: () => {},
  onChange: () => {}
};
export default ArrInput;
