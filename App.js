/**
 * Test for RNWork
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, View} from 'react-native';
import ForecastCard from './components/ForecastCard';
import ErrorCard from './components/ErrorCard';
import Globals from './Globals'
import Spinner from 'react-native-loading-spinner-overlay';

export default class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			latitude: 25.761681,
			longitude: -80.191788,
			forecast: [],
      spinner: false,
			error:''
		};
	}

	componentDidMount(){
		// Get the user's location
		this.getLocation();
	}

	getLocation(){

    // check if geolocation is defined, simulator this will fail
    if (navigator.geolocation == undefined) {
      this.getWeather();
      return;
    }

		// Get the current position of the user
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
			(error) => this.setState({ forecast: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}

	getWeather(){

    //  Begin the spinner
    this.setState({
        spinner: true
      });

		let api = Globals.API_KEY;

		// Construct the API url to call
		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=' + api;

		// Call the API, and set the state of the weather forecast
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
        spinner: false,
				forecast: data
			}));
		})
	}

	render() {
		if (this.state.spinner) {
			return (
				<View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
			);
		}
		if (this.state.forecast.list) {
			return (
				<FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
			);
		}
		return (
			<View style={styles.container}>
				<ErrorCard />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#B2B2B2'
	},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
