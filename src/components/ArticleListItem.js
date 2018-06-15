import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { deleteArticle } from "../actions/index";
import { Audio } from 'expo';

import { Image } from 'react-native';
import {
  Container, Content, Header, Item,
  Button, Icon, Text, Card, CardItem,
  Thumbnail, Left, Body, Right
} from 'native-base';

import recordingsStorageRef from '../firebase';

if (!global.atob) {
  global.atob = require('base-64').decode;
}

class ArticleListItem extends React.Component {

  state = {
    recordingIsPlaying: false
  }

  play = async (url) => {
    if (url === '') {
      alert('No recording yet for this article')
    }
    else {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(
          { uri: url },
          initialStatus = {},
          downloadFirst = true
        );
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        console.log(error);
      }
    }
    // this.setState({recordingIsPlaying: true});
  }

  pause = (sound) => {
    sound.pause();
    // this.setState({recordingIsPlaying: false});
  }

  componentWillMount() {
    const { article } = this.props;
  }

  render() {
    const { articleId, article, deleteArticle } = this.props;
    let recordingURL = '';
    if (article.recordingRef !== '' && article.recordingRef < 100) {
      console.log(article.recordingRef);
      recordingsStorageRef.child(article.recordingRef).getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
        recordingURL = url;
      }).catch(function(error) {
        console.log(error);
      });
    }
    // make the recording available to this environment
    // const sound = new Audio(article.recording);
    return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'http://i.pravatar.cc/300'}} />
              <Body>
                <Text>{article.title}</Text>
                <Text note>{article.user.displayName}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody style={{marginRight: 10, marginLeft: 10}}>
            { article.scrapedContent ? (
              <Text>
                {String(article.scrapedContent).split(' ').slice(0, 30).join(' ') + ' ...'}
              </Text>
            ) : (
              <Text>
                No caption available
              </Text>
            ) }
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent onPress={() => this.play(recordingURL)}>
                <Icon active name="play" />
                <Text>Play</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent onPress={() => alert('Sort out the play functionality')}>
                <Icon active name="pause" />
                <Text>Pause</Text>
              </Button>
            </Body>
            <Right>
              <Text>Delete</Text>
            </Right>
          </CardItem>
        </Card>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

// do this with MapDispatchToProps()
export default connect(mapStateToProps, { deleteArticle })(ArticleListItem);
