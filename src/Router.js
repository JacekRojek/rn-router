'use strict';

var React = require('react-native');
var { StyleSheet, View, Navigator } = React;
var ReactNative = require('react');
var { PropTypes, Children }  = ReactNative;

var Router = React.createClass({

  displayName: 'Router',

  childContextTypes: {
    platform: PropTypes.string,
    route: PropTypes.object,
    lastRoute: PropTypes.object,
    transitionTo: PropTypes.func,
    transitionBack: PropTypes.func
  },

  getInitialState() {
    return {
      route: this.getInitalRoute(),
      lastRoute: null
    };
  },

  getChildContext() {
    return {
      platform: this.props.platform || 'undefined',
      route: this.state.route,
      lastRoute: this.state.lastRoute,
      transitionTo: this.transitionTo,
      transitionBack: this.transitionBack
    };
  },

  getRouteComponent(name, indexRoute) {
    indexRoute = typeof indexRoute === 'undefined' ? false : indexRoute;

    var routeComponent = {};
    Children.map(this.props.children, (child) => {
      if (indexRoute) {
        if (child.type.displayName === 'IndexRoute') {
          routeComponent = child.props;
        }
      } else {
        if (child.props.name === name) {
          routeComponent = child.props;
        }
      }
    });

    return routeComponent;
  },

  getInitalRoute() {
    var componentProps = this.getRouteComponent('', true);

    return {
      name: componentProps.name || 'inital route',
      component: componentProps.component,
      props: {},
      sceneConfig: Navigator.SceneConfigs.FloatFromRight
    };
  },

  transitionBack() {
    this.refs.navigator.pop();
  },

  transitionTo(name, props, sceneConfig) {
    props = typeof props === 'undefined' ? {} : props;
    props = typeof props === 'object' ? props : {};

    var navigator = this.refs.navigator;
    var component = this.getRouteComponent(name).component;
    if (typeof component !== 'undefined') {
      navigator.push({
        name: name,
        component: component,
        props: props,
        sceneConfig: sceneConfig || Navigator.SceneConfigs.FloatFromRight
      });
    }
  },

  renderScene(route, navigator) {
    return React.createElement(route.component, route.props);
  },

  configureScene(route) {
    if (this.state.route !== route) {
      this.setState({ lastRoute: this.state.route, route: route });
    }
    return route.sceneConfig;
  },

  render() {
    var navProps = {
      initialRoute: this.state.route,
      configureScene: this.configureScene,
      renderScene: this.renderScene
    };

    return (
      <Navigator
        ref="navigator"
        {...navProps} />
    );
  }
});

var styles = StyleSheet.create({
  hidden: {
    height: 0,
  }
});

module.exports = Router;
