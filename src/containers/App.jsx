import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../components/HomePage.jsx';
import ViewFileInfoPage from '../components/ViewFileInfoPage.jsx';

const SCOPE = 'https://www.googleapis.com/auth/drive.metadata';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      GoogleAuth: {},
      gapiClient: null,
      isSignedIn: false,
    };

    this.initClient = this.initClient.bind(this);
    this.updateSignInStatus = this.updateSignInStatus.bind(this);
    this.setSignInStatus = this.setSignInStatus.bind(this);
    this.updateGoogleAuthInState = this.updateGoogleAuthInState.bind(this);
    this.updateGAPIinState = this.updateGAPIinState.bind(this);
  }

  componentDidMount(){
    window.gapi.load('client:auth2', this.initClient)
  }

  initClient(){
    let { GoogleAuth } = this.state;
    const updateSignInStatus = this.updateSignInStatus;
    const setSignInStatus = this.setSignInStatus;
    const updateGoogleAuthInState = this.updateGoogleAuthInState;
    const updateGAPIinState = this.updateGAPIinState;

    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.

    gapi.client.init({
      'apiKey': process.env.GOOGLE_API_KEY,
      'discoveryDocs': [discoveryUrl],
      'clientId': process.env.GOOGLE_CLIENT_ID,
      'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
      updateGoogleAuthInState(GoogleAuth);
      updateGAPIinState(gapi.client);
      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSignInStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      let user = GoogleAuth.currentUser.get();
      setSignInStatus();
    });
  }

  updateGAPIinState(client){
    this.setState({gapiClient: client})
  }

  updateSignInStatus(isSignedIn){
    this.setSignInStatus(isSignedIn)
  }

  setSignInStatus(isSignedIn) {
    const { GoogleAuth } = this.state;
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);

    if(isAuthorized){
      this.setState({isSignedIn: true})
    }else{
      GoogleAuth.signIn();
    }

  }

  updateGoogleAuthInState(GoogleAuth){
    this.setState({GoogleAuth: GoogleAuth})
  }


  render () {
    const { GoogleAuth, gapiClient } = this.state;
    return(
      <div className='container'>
        <h1>Data Management Tool</h1>
        <Router>
          <React.Fragment>
            <Route exact path='/' render={() => <HomePage GoogleAuth={GoogleAuth} gapiClient={gapiClient}/>}/>
            <Route path='/file/:id' render={(props) => <ViewFileInfoPage
              GoogleAuth={GoogleAuth}
              gapiClient={gapiClient}
              fileId={props.match.params.id}
              />}/>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App;
