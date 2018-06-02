import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { deleteArticle } from "../actions/index";

import { Image } from 'react-native';
import {
  Container, Content, Header, Item,
  Button, Icon, Text, Card, CardItem,
  Thumbnail, Left, Body, Right
} from 'native-base';

import Video from 'react-native-video';

const base64 = require('base-64');

if (!global.atob) {
  global.atob = require('base-64').decode;
}

class ArticleListItem extends React.Component {

  state = {
    recordingIsPlaying: false
  }

  play = (sound) => {
    sound.play();
    // this.setState({recordingIsPlaying: true});
  }

  pause = (sound) => {
    sound.pause();
    // this.setState({recordingIsPlaying: false});
  }

  /**
   * Convert a base64 string in a Blob according to the data and contentType.
   */
  base64ToBlob = (b64Data, contentType, sliceSize) => {
          contentType = contentType || '';
          sliceSize = sliceSize || 512;

          var byteCharacters = atob(b64Data);
          var byteArrays = [];

          for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              var slice = byteCharacters.slice(offset, offset + sliceSize);

              var byteNumbers = new Array(slice.length);
              for (var i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);

              byteArrays.push(byteArray);
          }

        var blob = new Blob(byteArrays, {type: contentType});

        return blob;
  }

  componentWillMount() {
    const { article } = this.props;

    if (article.recording) {
      /** Process the type1 base64 string **/
      var myBaseString = article.recording;

      // Split the base64 string in data and contentType
      var block = myBaseString.split(";");
      // Get the content type
      var dataType = block[0].split(":")[1];// In this case "audio/mpeg"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];// In this case "SUQzAwAAAAAD...."

      console.log(this.base64ToBlob(realData, dataType));
    }
  }

  render() {
    const { articleId, article, deleteArticle } = this.props;
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
              <Button transparent onPress={() => alert('Sort out the pause functionality')}>
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
