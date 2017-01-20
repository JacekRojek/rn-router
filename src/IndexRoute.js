'use strict';

var ReactNative = require('react-native');
var { StyleSheet, View } = ReactNative;
var React = require('react');

var IndexRoute = React.createClass({
  displayName: 'IndexRoute',
  render() {
    return (
      <View style={styles.hidden}></View>
    );
  }
});

var styles = StyleSheet.create({
  hidden: {
    height: 0,
  }
});

module.exports = IndexRoute;
