import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from 'react-native';
import _ from 'lodash';
import * as actions from '../actions/index';
import ArticleListItem from './ArticleListItem';

import { Container, Content, Header, Item, Button, Icon, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

class ArticleList extends React.Component {

  state = {
    addFormVisible: false
  };

  toggleRecorderVisibility = () => {
    if (this.state.recorderVisible) {
      this.setState({recorderVisible: false});
    }
    else {
      this.setState({recorderVisible: true});
    }
  };

  renderAddForm = () => {
    const { addFormVisible } = this.state;
    if (addFormVisible) {
      return (
        /*<ArticleForm />*/
        <Text>Here will be the ArticleForm</Text>
      );
    }
  };

  renderArticles() {
    const articles = this.props.articles;
    const fetchedArticles = _.map(articles, (value, key) => {
      return <ArticleListItem key={key} articleId={key} article={value} />;
      /* return <ListItem key={key}><Text>{value.title}</Text></ListItem>; */
    });
    if (!_.isEmpty(fetchedArticles)) {
      return fetchedArticles;
    }
    return (
      <Content className="nothing-found" style={styles.nothingFound}>
        <Text>You have no articles here</Text>
        <Text>Start by clicking add button in the bottom of the screen</Text>
      </Content>
    );
  }

  componentWillMount() {
    // when the component mounts, fetch all articles
    this.props.fetchArticles();
  }

  render() {
    const { addFormVisible } = this.state;
    const signOut = this.props.signOut;
    return (
      <Container style={styles.container}>
        <Header style={{width: '100%'}}>
          <Left>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Container
          style={styles.wrapper}
          className="article-list-container">
          <Content style={{paddingRight: 10, paddingLeft: 10}}>
            {this.renderArticles()}
          </Content>
          <Button style={styles.formButton}
            onPress={() => this.setState({ addFormVisible: !addFormVisible })}>
            {addFormVisible ? (
              <Icon type="FontAwesome" name="times" />
            ) : (
              <Icon type="FontAwesome" name="plus" />
            )}
          </Button>
        </Container>
        {this.renderAddForm()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  nothingFound: {
    display: 'flex',
    flex: 1,
    paddingTop: 60
  },
  formButton: {
    zIndex: 1500,
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});

const mapStateToProps = state => ({
  articles: state.articles,
  user: state.auth,
  recorder: state.recorder
});

// give the actions with mapDispatchToProps()
export default connect(mapStateToProps, actions)(ArticleList);
