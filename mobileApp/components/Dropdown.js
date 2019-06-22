import React from 'react'
import { Picker, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'

export default class DropDown extends React.Component {

    state = {
        displayValue: 'first'
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.value}
                    style={styles.picker}
                    onValueChange={(value) => this.setState({ displayValue: value })} >
                    {this.props.items.map((elem, index) => {
                        return (<Picker.Item key={index} label={elem.label} value={elem.value} />)
                    })}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: css.colours.input
    },
    picker: {
        height: 40,
    }
})