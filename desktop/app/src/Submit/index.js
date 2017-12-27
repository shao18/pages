import PropTypes from "prop-types";
import React, { Component } from "react";
import "Submit/css/index.css";
import AbstractButton from "AbstractButton";
/**
 * Submit
 */
class Submit extends AbstractButton {
  get inputType() {
    return "submit";
  }

  get blockName() {
    return "submit";
  }
}
export default Submit;
