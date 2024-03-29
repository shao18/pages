import AbstractInput from "AbstractInput";
import PropTypes from "prop-types";
import React from "react";
import "DateInput/css/index.css";
/**
 * DateInput
 */
class DateInput extends AbstractInput {
  get blockName() {
    return "date";
  }

  get inputType() {
    return "date";
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
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
DateInput.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string
};
DateInput.defaultProps = {
  value: "",
  state: "normal",
  className: "",
  placeholder: ""
};
export default DateInput;
