import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';

import { deleteVehicle } from '../../../action/vehicle_action';

const buttons = ['Cancel', 'Delete'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class VehicleListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  _onPressSettings() {
    this.ActionSheet.show();
  }

  _handlePress(index) {
    if (index === DESTRUCTIVE_INDEX) {
      this.props.deleteVehicle(this.props.item);
    }
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{marginBottom: 6}}>
            <Text><Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.make}</Text> <Text style={{fontSize: 16}}>{item.model}</Text></Text>
          </View>
          <View>
            <Text>{item.year}</Text>
          </View>
        </View>
        <View style={{width: 30}}>
          <TouchableHighlight underlayColor="transparent" onPress={this._onPressSettings.bind(this)}>
            <View>
              <IonIcon name="ios-more" size={30} color="#888" />
            </View>
          </TouchableHighlight>
        </View>
        <ActionSheet
          ref={(o) => this.ActionSheet = o}
          title={`${item.make} ${item.model} ${item.year}`}
          options={buttons}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handlePress.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

const mapStateToProps = (state, ownProps) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteVehicle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleListItem);
