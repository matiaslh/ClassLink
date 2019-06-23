import React from 'react'
import { Picker, View, StyleSheet } from 'react-native';
import css from './css'

export default class DropDown extends React.Component {

    constructor(props) {
        super(props)
        let startValue = props.value ? props.value : 'any'
        this.state = { value: startValue }
    }

    onChange = (value) => {
        this.setState({ value })
        this.props.onChange(value)
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.value}
                    style={styles.picker}
                    onValueChange={this.onChange} >
                    {this.props.items.map((entry, index) => {
                        let value = Object.keys(entry)[0]
                        return (<Picker.Item key={index} label={entry[value]} value={value} />)
                    })}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: css.colours.input,
        borderColor: css.colours.inputBorder,
        borderWidth: 1
    },
    picker: {
        height: 40,
        width: 200
    }
})