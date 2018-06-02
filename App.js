import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { allReducers } from './src/reducers/index';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/components/SignIn';
import ArticleList from './src/components/ArticleList';
import { articlesRef, authRef, provider } from "./src/firebase";
import requireAuth from "./src/components/auth/requireAuth";

// create store with allReducers, initialState and reduxThunk
const store = createStore(
  allReducers,
  {},
  // window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(reduxThunk)
);

export default class App extends React.Component {
  fetchUser = () => dispatch => {
    // if the user exists (i.e. is logged in), send a payload with the user information
    authRef.onAuthStateChanged(user => {
      if (user) {
        console.log('found the user');
        dispatch({
          type: "FETCH_USER",
          payload: user
        });
      } else {
        console.log('no damn user');
        dispatch({
          type: "FETCH_USER",
          payload: null
        });
      }
    });
  };

  componentWillMount() {
    // check if the user exists
    console.log('hello from fetching the user');
    this.fetchUser();
  }

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            <Route exact path="/signin" exact component={SignIn} />
            /* temporarily let ArticleList have path / for quicker dev */
            <Route exact path="/" exact component={ArticleList} />
          </Switch>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
