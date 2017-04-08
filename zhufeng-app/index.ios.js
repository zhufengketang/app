/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';


console.log("My first app....")
import {Entry} from './app/entry'

AppRegistry.registerComponent('zhufengketang', () => Entry);
