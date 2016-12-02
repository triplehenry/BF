import React, { Component } from 'react'
import reducers from '../../reducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {createStore, applyMiddleware} from 'redux'
import {AsyncStorage} from 'react-native'

console.disableYellowBox = true;

const logger = createLogger({
  collapsed: false,
  predicate: (getState, action) => process.env.NODE_ENV === 'development'
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = autoRehydrate()(createStoreWithMiddleware)(reducers)

import {
  Platform,
  StatusBar,
  BackAndroid,
  View,
  Navigator,
  Text
} from 'react-native'
import LandingScreen from './landing_screen'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount(){
    StatusBar.setHidden(true);
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({ rehydrated: true })
    });
  }


  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  render() {
    if (!this.state.rehydrated){
      return (<View />);
    }

    return (
      <Provider store={store}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'transparent'}}>
          <Navigator
            style={{
              flex: 1,
              backgroundColor: 'transparent'}}
            ref='navigator'
            initialRoute={{
              component: LandingScreen
            }}
            configureScene={this.configureScene}
            renderScene={(route, navigator) => {
              return <route.component
                        navigator={navigator}
                        {...route}
                        {...route.passProps}/>
            }}
          />
        </View>
      </Provider>
    )
  }

  configureScene (route: Object) {
    return route.scene || Navigator.SceneConfigs.FloatFromBottom
  }

  handleBack = () => {
    const navigator = this.refs.navigator
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  };
}
