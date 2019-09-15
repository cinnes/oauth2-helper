import React from 'react';
import './App.css';
import rp from 'request-promise';
import DetailsForm from './DetailsForm';

import { Card, Elevation, Button, Code, Switch, Pre } from '@blueprintjs/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);

    this.state = {
      darkMode: JSON.parse(localStorage.getItem('darkMode')),
      clientId: localStorage.getItem('clientId') || '',
      clientSecret: localStorage.getItem('clientSecret') || '',
      authEndpoint: localStorage.getItem('authEndpoint') || '',
      tokenEndpoint: localStorage.getItem('tokenEndpoint') || '',
      authCode: params.get('code'),
      homeUrl: 'https://cinnes.github.io/oauth2-helper/',
      tokenResponse: '',
      tokenError: ''
    };

    this.updateState = this.updateState.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getToken = this.getToken.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  render() {
    var main;

    var tokenBlock;

    if (this.state.tokenResponse) {
      tokenBlock = 
        <div>
          <h4>Token Response</h4>
          <Pre><Code>{this.state.tokenResponse}</Code></Pre>
        </div>
    } else if (this.state.tokenError) {
      tokenBlock = 
        <div>
          <h4>Error</h4>
          <Pre><Code>{this.state.tokenError}</Code></Pre>
        </div>
    } else {
      tokenBlock = <Button disabled={this.state.tokenResponse} onClick={this.getToken}>Fetch Token</Button>
    }

    if (this.state.authCode) {
      main = 
        <Card interactive={false} elevation={Elevation.TWO}>
          <h4>Authorisation Code: </h4>
          <Pre><Code>{this.state.authCode}</Code></Pre>
          {tokenBlock}
        </Card>
    } else {
      main =
        <Card interactive={false} elevation={Elevation.TWO}>
          <DetailsForm 
            changeHandler={this.updateState} 
            submitHandler={this.redirect}
            clientId={this.state.clientId}
            clientSecret={this.state.clientSecret}
            authEndpoint={this.state.authEndpoint}
            tokenEndpoint={this.state.tokenEndpoint}/>
        </Card>
    }

    const appClass = this.state.darkMode ? "App bp3-dark" : "App";

    return (
      <div className={appClass}>
        <div className="container center">
          <Switch checked={this.state.darkMode} label="Dark Mode" onChange={this.toggleDarkMode} />
          {main}
        </div>
      </div>
    );
  }
  
  updateState(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }
  
  redirect(event) {
    localStorage.setItem('clientId', this.state.clientId);
    localStorage.setItem('clientSecret', this.state.clientSecret);
    localStorage.setItem('authEndpoint', this.state.authEndpoint);
    localStorage.setItem('tokenEndpoint', this.state.tokenEndpoint);

    event.preventDefault();
    const url = `${this.state.authEndpoint}?response_type=code&client_id=${this.state.clientId}&redirect_uri=${this.state.homeUrl}&scope=read write`
    window.location = url;
  }

  getToken() {
    const authCode = this.state.authCode;

    const options = {
      uri: encodeURI(this.state.tokenEndpoint),
      method: 'POST',
      body: {
        code: authCode,
        client_id: this.state.clientId,
        client_secret: this.state.clientSecret,
        grant_type: "authorization_code"
      },
      json: true
    };

    const that = this;
    rp.post(options)
      .then(function(res) {
        that.setState({
          tokenResponse: JSON.stringify(res, null, 1),
        });
      })
      .catch(function(err) {
        that.setState({
          tokenError: JSON.stringify(err.error, null, 1),
        });
      });
  }

  toggleDarkMode() {
    const newDarkMode = !this.state.darkMode;
    localStorage.setItem('darkMode', newDarkMode);
    this.setState({
      darkMode: newDarkMode,
    });
  }
}

export default App;
