/**
 * RNWork App
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';


export default class ErrorCard extends Component {

	render() {

		return (
			<Card containerStyle={styles.card}>
				<Text style={styles.message}>No Forecast Data</Text>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'#fd1205',
		borderWidth:0,
		borderRadius:20
	},
	message: {
		fontSize: 38,
		color:'#fff',
		textTransform:'capitalize'
	}
});
