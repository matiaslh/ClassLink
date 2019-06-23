import React from 'react'
import { Picker, View, StyleSheet } from 'react-native';
import css from './css'

export default class DropDown extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: props.value }
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.value}
                    style={styles.picker}
                    onValueChange={this.props.onChange} >
                    {Object.entries(this.props.items).map((entry, index) => {
                        return (<Picker.Item key={index} label={entry[1]} value={entry[0]} />)
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
        width: 200
    }
})