import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateForm from '../form/create_form';
import BasicNavBar from '../ui/basic_nav_bar';

let deviceScreen = Dimensions.get('window');

class CreateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makeText: "",
      modelText: "",
      yearText: "",
    }
  }
  _onPressClose() {
    this.props.onPressClose();
  }

  onPressCreate() {
    this.props.onPressCreate(this.state);
    this.props.onPressClose();
  }

  render() {
    let btnRightNav = (<BasicNavBar.TextButton text="Save" onPress={this.onPressCreate.bind(this)} />);
    let btnLeftNav = (<BasicNavBar.TextButton text="Cancel" onPress={this._onPressClose.bind(this)} />);

    return (
      <Modal
        animationType="slide"
        onRequestClose={() => {this._onPressClose()}}>
        <View style={styles.container}>
          <View>
            <BasicNavBar
              title="Create Vehicle"
              leftButton={btnLeftNav}
              rightButton={btnRightNav}/>
          </View>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <CreateForm makeText={this.state.makeText} modelText={this.state.modelText} yearText={this.state.yearText} onChangeText={(state) => this.setState(state)} />
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state, ownProps) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
