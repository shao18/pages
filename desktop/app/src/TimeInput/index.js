import AbstractInput from "AbstractInput";
import PropTypes from "prop-types";
import React from "react";
import "TimeInput/css/index.css";
/**
 * TimeInput
 */
class TimeInput extends AbstractInput {
  get blockName() {
    return "time";
  }

  get inputType() {
    return "time";
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
          className={this._inputClass}
          type={this.inputType}
          value={this.props.value}
          disabled={this.props.state === "disabled"}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          min="00:00"
          max="23:59"
        />
      </div>
    );
  }
}
TimeInput.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string
};
TimeInput.defaultProps = {
  value: "",
  state: "normal",
  className: "",
  placeholder: "",
  id: ""
};
export default TimeInput;
