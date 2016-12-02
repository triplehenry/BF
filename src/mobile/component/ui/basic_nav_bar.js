import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons'

let deviceScreen = Dimensions.get('window')

class NavBar extends React.Component {

  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    style: PropTypes.object,
    statusBar: PropTypes.object,
    height: PropTypes.number.isRequired,
    titleOpacity: PropTypes.number.isRequired,
    hasBottomBorder: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    title: '',
    leftButton: <View/>,
    rightButton: <View/>,
    style: {},
    height: 60,
    titleOpacity: 1.0,
    hasBottomBorder: true,
  };


  render() {

    let title;
    if (typeof this.props.title === 'string') {
      title = (<View style={styles.textTitleWrap}><Text style={{fontSize: 16, color: "#333"}}>{this.props.title}</Text></View>);
    } else {
      title = this.props.title;
    }

    let statusBar = (<StatusBar barStyle={"default"} animated={true} />);

    return (
      <View>
        {statusBar}
        <View style={[styles.container, this.props.style, {borderBottomWidth: (this.props.hasBottomBorder) ? 1 : 0}]}>
          <View style={styles.navBar}>
            <View style={[styles.leftButtonWrap, {opacity: this.props.titleOpacity}]}>
              {this.props.leftButton}
            </View>
            <View style={[styles.titleWrap, {opacity: this.props.titleOpacity}]}>
              {title}
            </View>
            <View style={[styles.rightButtonWrap, {opacity: this.props.titleOpacity}]}>
              {this.props.rightButton}
            </View>
          </View>

        </View>
      </View>
    );
  }
}

NavBar.TextButton = React.createClass({
  render() {
    let onPressFn;
    if(!this.props.disable){
      onPressFn = this.props.onPress;
    }

    return (
      <TouchableOpacity onPress={onPressFn}>
        <View style={[{alignItems:'center', justifyContent: 'center', paddingLeft: 6, paddingRight: 6, opacity: this.props.disable ? 0.2 : 1}]}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#ededed",
    borderBottomWidth: 1
  },
  navBar: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  textTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButtonWrap: {
    paddingTop: 8,
    width: 60,
  },
  rightButtonWrap: {
    top: 8,
    width: 60,
  },

});

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(NavBar);
