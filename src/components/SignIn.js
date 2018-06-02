import React from "react";
import { connect } from "react-redux";
import { signIn } from "../actions/index";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-native';

import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import firebase from 'firebase';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      email: 'radu@maz.com',
      password: 'steaua86'
    })
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      // this.context.router.history.push("/app");
      this.props.history.push('/app');
    }
  }

  signUp = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Passwords must be at least 6 characters long");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      console.log(e.toString());
    }
  }

  signIn = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        // The user is redirected to the main page
        this.props.history.push('/app');
      })
    } catch (e) {
      console.log(e.toString());
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Text id="sign-in-header">Welcome to Lys</Text>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCorrect={false} autoCapitalize="none" onChangeText={(email) => this.setState({ email })}/>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input autoCorrect={false} autoCapitalize="none" secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>
          </Item>
          <Button style={{marginTop: 20}} full rounded success
            onPress={() => this.signIn(this.state.email, this.state.password)}
          >
            <Text style={{color: '#fff'}}>Login</Text>
          </Button>
          <Button style={{marginTop: 20}} full rounded primary
            onPress={() => this.signUp(this.state.email, this.state.password)}
          >
            <Text style={{color: '#fff'}}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signIn })(SignIn);
