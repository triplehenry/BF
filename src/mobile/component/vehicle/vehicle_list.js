import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  View,
  StyleSheet,
  ListView,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VehicleListItem from './vehicle_list_item';

class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items)
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.items)
    })
  }

  _renderRow(item) {
    return (
      <VehicleListItem item={item} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          key={Date.now()}
          renderRow={(item) => this._renderRow(item)}
          dataSource={this.state.dataSource}
          keyboardDismissMode="on-drag"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state, ownProps) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
