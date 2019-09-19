import React from 'react';

import Input from "./Input";
import Button from "./Button";

// import { Validator } from "../../services/Validator";

import "../../styles/styles.scss";
import { Validator } from '../../services/Validator';

/**
 * props: fields
 * events: valueChanged, buttonClicked
 * 
 * fields = [ {name, value, type, placeholder}, ...]
 */
export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.validator = new Validator();

    this.valueChanged = this.valueChanged.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  renderErrors() {
    if (this.state.errors.length > 0) {
      return (
        <div className="errors">
          <ul>
            {
              this.state.errors.map((err) => {
                return <li key={err.key}>{err.text}</li>;
              })
            }
          </ul>
        </div>
      );
    }
  }

  buttonClicked(event) {
    let errors = this.validator.validateFields(this.props.fields);
    this.setState({ errors });
    if (errors.length === 0) {
      this.props.buttonClicked(event);
    }
  }

  valueChanged(value) {
    this.props.valueChanged(value);
  }

  render() {
    return (
      <div>
        {this.renderErrors()}
        <div className="form">
          {
            this.props.fields.map((field) => {
              return (
                <Input key={field.name}
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  valueChanged={this.valueChanged} />
              );
            })
          }
          <Button
            styles={{ float: 'right' }}
            buttonClicked={this.buttonClicked} >
            Add new
          </Button>
        </div>
      </div>
    );
  }
}