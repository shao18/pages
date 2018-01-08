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
    this.state = { showDropDown: this.props.showDropDown };
  }

  /*
   * @param {string} state  True for show, false for hide
   */
  showDropDown(state) {
    console.log(["state", state, Boolean(state)]);
    this.setState({ showDropDown: Boolean(state) });
  }

  onFocus() {
    this.showDropDown(true);
  }

  onBlur() {}

  /**
   * Handle for click  DropDown item
   */
  onSelect(event, participant) {
    console.log(["FFF",event,participant]);
  }

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
              className={this.blockName + "__item-img"}
            />
          );

        return (
          <li
            key={key}
            className={this.blockName + "__item"}
          onClick={this.props.onSelect.bind(null,item,this)} >	     
            {img} {item.login}
          </li>);
      });
      let cn =  `${this.blockName  }__list`;
      cn += ` ${  cn  }_show_${  ( this.state.showDropDown )? "true": "false"}`;

      return <ul className={cn}>{items}</ul>;
    }
    return null;
  }

  /**
   * Return list of deletable values
   * @param {Array} itemsArray List of array items
   * @param {string} mod Postfix of list class
   */
  listDeletable(itemsArray, mod){
    let items;
    if (itemsArray.length > 0) {
      items = itemsArray.map((item, key) => {
        let img;
        if (item.hasOwnProperty("avatarUrl"))
          img = (
            <img
              src={item.avatarUrl}
              alt=""
              className={this.blockName + "__item-img" + mod}
            />
          );

        return (
          <li key={key} className={this.blockName + "__item" + mod}>
            {img} {item.login}{" "}
            <a className={this.blockName + "__item-remove" + mod}>×</a>
          </li>);
      });
      return <ul className={`${this.blockName  }__list${  mod}`} >{items}</ul>;
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
    console.log(["v", this.props]);
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
  value: PropTypes.array,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  showDropDown: PropTypes.bool
};
ArrInput.defaultProps = {
  valueType: "single",
  value: [],
  state: "normal",
  className: "",
  placeholder: "",
  id: null,
  label: "",
  items: [],
  showDropDown: false,
  onSelect: () => {}
};
export default ArrInput;
