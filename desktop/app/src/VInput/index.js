import AbstractInput from "AbstractInput";
import PropTypes from "prop-types";
import React from "react";
import "VInput/css/index.css";
/**
 * VInput
 */
class VInput extends AbstractInput {
  /**
   * @ignore
   */
  render() {
    let classList = "";
    if (this.props.className !== "") {
      classList = ` ${this.props.className}`;
    }

    let del;
    if (this.props.value) {
      del = (
        <a
          className={`${this._inputClass}-delete`}
          onClick={this.props.onDelete}
        />
      );
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
          onChange={this.props.onChange}
        />
        {del}
      </div>
    );
  }
}
VInput.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  value: PropTypes.string,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array
};
VInput.defaultProps = {
  value: "",
  state: "normal",
  className: "",
  placeholder: "",
  id: null,
  label: "",
  items: []
};
export default VInput;
