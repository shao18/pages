import AbstractInput from "AbstractInput";
import PropTypes from "prop-types";
import React from "react";
import "ListInput/css/index.css";
/**
 * ArrInput
 */
class ListInput extends AbstractInput {
  get blockName() {
    return "list";
  }

  get list() {
    let items;
    if (this.props.items.length > 0) {
      items = this.props.items.map((item, key) => (
        <li key={key} className={`${this.blockName}__item`}>
          <b>
            {item.start} — {item.end}
          </b>{" "}
          {item.text}
        </li>
      ));
      return <ul className={`${this.blockName}__list`}>{items}</ul>;
    }
    return (
      <div className={`${this.blockName}__placeholder`}>
        {this.props.placeholder}
      </div>
    );
  }

  get valueBlock() {
    return (
      <div className={`${this.blockName}__value`}>
        <span className={`${this.blockName}__value-wrap`}>
          <b>
            {this.props.value.start} — {this.props.value.end}
          </b>{" "}
          {this.props.value.text}
        </span>{" "}
        <a className={`${this.blockName}__value-remove`}>×</a>
      </div>
    );
  }

  /**
   * @ignore
   */
  render() {
    let classList = "";
    if (this.props.className !== "") {
      classList = ` ${this.props.className}`;
    }
    const out = this.props.value === null ? this.list : this.valueBlock;

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
        {out}
      </div>
    );
  }
}
ListInput.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.array,
  state: PropTypes.oneOf(["normal", "focus", "error", "disabled"]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array
};
ListInput.defaultProps = {
  value: null,
  state: "normal",
  className: "",
  placeholder: "",
  id: null,
  label: "",
  items: []
};
export default ListInput;
