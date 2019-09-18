import React from 'react';

import Input from "./Input";
import Button from "./Button";

import { Validator } from "../../services/Validator";

import "../../styles/styles.scss";

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  renderErrors() {
    if (this.state.errors) {
      return (
        <div className="errors">
          {
            this.state.errors.map((err) => {
              return <div>{err}</div>;
            })
          }
        </div>
      );
    }
  }

  buttonClicked({ buttonClickEvent, data }) {
    console.log({ buttonClickEvent, data });

    const errors = Validator.validateFields(this.props.fields);
    this.setState({ errors });
    if (errors.length === 0) {
      this.props.buttonClicked({ buttonClickEvent, data });
    }

  }

  render() {
    return (
      <div>
        {this.renderErrors()}
        <div className="form">
          {
            this.props.fields.map((field) => {
              return (
                <Input type={field.type}
                  name={field.name}
                  value={field.value} />
              );
            })
          }
          <Button
            styles={{ float: 'right' }}
            buttonClicked={(data) => { this.buttonClicked(data) }} >
            Add new
          </Button>
        </div>
      </div>
    );
  }
}