import React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

class DetailsForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.submitHandler}>
        <FormGroup
            label='Client ID'
            labelFor='text-input'
            labelInfo='(required)'>
          <InputGroup name="clientId" id='text-input' defaultValue={this.props.clientId} placeholder='1x46iftmdzqtt' onChange={this.props.changeHandler}></InputGroup>
        </FormGroup>

        <FormGroup
            label='Client Secret'
            labelFor='text-input'
            labelInfo='(required)'>
          <InputGroup name="clientSecret" id='text-input' defaultValue={this.props.clientSecret} placeholder='4ctdx7k5du36r5q1qfkarhw2ts5tbbhyv13c8yar0es6k40cwg'onChange={this.props.changeHandler}></InputGroup>
        </FormGroup>

        <FormGroup
            helperText='The endpoint used by the client to obtain an authorisation code.'
            label='Auth Endpoint'
            labelFor='text-input'
            labelInfo='(required)'>
          <InputGroup name="authEndpoint" id='text-input' defaultValue={this.props.authEndpoint} placeholder='https://my.domain/oauth/authorise' onChange={this.props.changeHandler}></InputGroup>
        </FormGroup>

        <FormGroup
            helperText='The endpoint used by the application to trade an auth code for an access token.'
            label='Token Endpoint'
            labelFor='text-input'
            labelInfo='(required)'>
          <InputGroup name="tokenEndpoint" id='text-input' defaultValue={this.props.tokenEndpoint} placeholder='https://my.domain/oauth/token' onChange={this.props.changeHandler}></InputGroup>
        </FormGroup>

        <Button type="submit" rightIcon="arrow-right" intent="success" text="Next step" />
      </form>
    );
  }
}

export default DetailsForm;