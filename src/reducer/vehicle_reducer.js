import _ from 'lodash';

import types from '../lib/action_types';

const initialState = {
  data: [],
  makeList: [],
  modelList: [],
  yearList: [],
};

export default function alarmReducer(state = initialState, action) {
  switch (action.type) {

  case types.GET_VEHICLES:
    let tempMake = {};
    let tempModel = {};
    let tempYear = {};

    let makeList = [];
    let modelList = [];
    let yearList = [];

    _.forEach(action.data, (obj) => {
      if (!tempMake[obj.make]) {
        makeList.push(obj.make);
      }
      if (!tempModel[obj.model]) {
        modelList.push(obj.model);
      }
      if (!tempYear[obj.year]) {
        yearList.push(obj.year);
      }

      tempMake[obj.make] = true;
      tempModel[obj.model] = true;
      tempYear[obj.year] = true;

    });

    return Object.assign({}, state, {
      data: action.data,
      makeList,
      modelList,
      yearList,
    });

  case types.DELETE_VEHICLE:
    let newDataDelete = state.data.slice();
    newDataDelete = _.without(newDataDelete, action.data);

    return Object.assign({}, state, {
      data: newDataDelete
    });

  case types.ADD_VEHICLE:
    let newDataAdd = state.data.concat([action.data]);
    newDataAdd = _.sortBy(newDataAdd, (item) => {
      return item.make;
    })

    return Object.assign({}, state, {
      data: newDataAdd
    });

  default:
    return state;
  }
}
