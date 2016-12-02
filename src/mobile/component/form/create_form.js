import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let deviceScreen = Dimensions.get('window');

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            keyboardType={"twitter"}
            value={this.props.makeText}
            placeholder={"Make"}
            autoCapitalize={'words'}
            autoFocus={true}
            onChangeText={(text) => this.props.onChangeText({makeText: text})} />
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            keyboardType={"twitter"}
            value={this.props.modelText}
            placeholder={"Model"}
            autoCapitalize={'words'}
            onChangeText={(text) => this.props.onChangeText({modelText: text})} />
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            keyboardType={"number-pad"}
            value={this.props.yearText}
            placeholder={"Year"}
            autoCapitalize={'words'}
            onChangeText={(text) => this.props.onChangeText({yearText: text})} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textInput: {
    width: deviceScreen.width,
    height: 40,
    fontSize: 16,
  },
});

const mapStateToProps = (state, ownProps) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
