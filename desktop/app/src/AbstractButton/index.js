import PropTypes from "prop-types";
import React, { Component } from "react";
/**
 * Button
 */
class AbstractButton extends Component {
  get blockName() {
    return "button";
  }

  get inputType() {
    return "button";
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
      <input
        type={this.inputType}
        className={
          this.blockName +
          (this.props.state !== "normal"
            ? ` ${this.blockName}__state_${this.props.state}`
            : "") +
          classList
        }
        onClick={this.props.onClick}
        value={this.props.value}
        disabled={this.props.state === "disabled"}
      />
    );
  }
}
AbstractButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  state: PropTypes.oneOf(["normal", "active", "hover", "disabled"])
};
AbstractButton.defaultProps = {
  onClick: e => {},
  value: "",
  state: "normal",
  className: ""
};
export default AbstractButton;
