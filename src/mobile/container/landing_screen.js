import React from 'react';
import _ from 'lodash';

import {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import { getVehicles, addVehicle } from '../../action/vehicle_action';
import CreateModal from '../component/modal/create_modal';
import VehicleList from '../component/vehicle/vehicle_list';
import SearchInput from '../component/search/search_input';

class LandingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    if (!this.props.vehicles.length) {
      this.props.getVehicles();
    }
  }

  _onPressCreate(obj) {
    this.props.addVehicle({
      make: obj.makeText,
      model: obj.modelText,
      year: Number(obj.yearText),
    });
  }

  _onSearch(search) {
    this.setState({search});
  }


  render() {
    let {vehicles} = this.props;
    let {search} = this.state;

    if (search) {
      search = search.toLowerCase();
      vehicles = _.filter(vehicles, function (item) {
        if (item.make && _.startsWith(item.make.toLowerCase(), search)) {
          return true;
        }
        if (item.model && _.startsWith(item.model.toLowerCase(), search)) {
          return true;
        }
        if (item.year && _.startsWith(item.year, search)) {
          return true;
        }
        return false;
      });
    }


    return (
      <View style={styles.container}>
        <SearchInput search={this.state.search} onSearch={(search) => this._onSearch(search)} />

        <VehicleList items={vehicles} />

        {this.state.isOpenCreateModal && (
          <CreateModal onPressClose={() => this.setState({ isOpenCreateModal: false })} onPressCreate={(obj) => this._onPressCreate(obj)} />
        )}
        <ActionButton
          buttonColor="green"
          onPress={() => this.setState({ isOpenCreateModal: true })}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    vehicles: state.vehicle.data || [],
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getVehicles,
    addVehicle,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
