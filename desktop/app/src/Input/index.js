import PropTypes from "prop-types";
import React, { Component } from "react";
import "Input/css/index.css";
/**
 * Input
 */
class Input extends Component {
  get blockName() {
    return "input";
  }

  get inputType() {
    return "text";
  }

  get _inputClass() {
    return `${this.blockName}__input`;
  }

  get id() {
    return this.props.id;
  }

  clickWrapper(e) {
    if (e.target.classList.contains(this.blockName)) {
      e.target.getElementsByClassName(this._inputClass)[0].focus();
    }
  }

  get label() {
    if (this.props.label !== "") {
      return (
        <label htmlFor={this.id} className="label">
          {this.props.label}
        </label>
      );
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
          value={this.props.value}
          disabled={this.props.state === "disabled"}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
Input.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
};
Input.defaultProps = {
  value: "",
  state: "normal",
  className: "",
  placeholder: "",
  id: null,
  label: ""
};
export default Input;
