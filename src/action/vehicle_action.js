import types from '../lib/action_types';
import vehicleInfo from '../data/vehicleInfo.json';

export function deleteVehicle(data){
  return { type: types.DELETE_VEHICLE, data: data };
}

export function addVehicle(data){
  return { type: types.ADD_VEHICLE, data: data };
}

export function getVehicles(){
  return { type: types.GET_VEHICLES, data: vehicleInfo };
}
