import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

let deviceScreen = Dimensions.get('window');

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  _onPressCancel() {
    this.props.onSearch("");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <IonIcon name="ios-search" size={20} color="#777" />
        </View>
        <TextInput
          style={styles.textInput}
          keyboardType={"twitter"}
          value={this.props.search}
          placeholder={"Search"}
          autoCapitalize={'words'}
          onChangeText={(text) => this.props.onSearch(text)} />
        <View style={[styles.iconWrap, {width: 50}]}>
          {this.props.search.length !== 0 && (
            <TouchableHighlight underlayColor="transparent" onPress={this._onPressCancel.bind(this)}>
              <IonIcon name="md-close" size={20} color="#111" />
            </TouchableHighlight>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    width: deviceScreen.width - 100,
    height: 50,
    fontSize: 16,
    paddingTop: 5,
  },
  iconWrap: {
    paddingTop: 7,
    paddingHorizontal: 15,
  },
});

const mapStateToProps = (state, ownProps) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
