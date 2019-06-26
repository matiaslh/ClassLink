import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from '../utils/css'
import constants from '../utils/constants'
import Header from '../utils/Header'
import Dropdown from '../utils/Dropdown'
import getNavigationOptions from '../utils/navigation'

export default class EditCourse extends React.Component {
    static navigationOptions = ({navigation}) => {
        return getNavigationOptions(navigation, { title: 'Edit Course' })
    }

    constructor(props) {
        super(props)
        const { navigation } = props
        this.state = {
            criteria: navigation.getParam('criteria', []),
            index: navigation.getParam('index', -1) // adding a new course
        }

        if (this.state.index === -1) {
            this.state.newCourse = {}
        }
    }

    getDetails = (type) => {
        // adding a new course
        if (this.state.index === -1) {
            return this.state.newCourse[type]
        } else {
            return this.state.criteria[this.state.index][type]
        }
    }

    onChange = (type, value) => {
        let criteria = this.state.criteria
        // adding a new course
        if (this.state.index === -1) {
            let obj = this.state.newCourse
            obj[type] = value
            this.setState({ newCourse: obj })
        } else {
            criteria[this.state.index][type] = value
            this.setState({ criteria })
        }
    }

    onSubmit = () => {
        let criteria = this.state.criteria
        // adding a new course
        if (this.state.index === -1) {
            criteria.push(this.state.newCourse)
        }
        this.props.navigation.navigate('Notify', { criteria })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header pageName="EditCourse" />
                </View>
                <View style={styles.allCriteria}>
                    <Text style={styles.label}>Department</Text>
                    <View style={styles.dropdown}><Dropdown name="department" items={constants.departments} value={this.getDetails('department')} onChange={value => this.onChange('department', value)} /></View>
                    <Text style={styles.label}>Level</Text>
                    <View style={styles.dropdown}><Dropdown name="level" items={constants.levels} value={this.getDetails('level')} onChange={value => this.onChange('level', value)} /></View>
                    <Text style={styles.label}>Course</Text>
                    <View><TextInput style={styles.textInput} keyboardType='numeric' value={this.getDetails('course')} onChangeText={value => this.onChange('course', value)} maxLength={4} /></View>
                    <Text style={styles.label}>Section</Text>
                    <View><TextInput style={styles.textInput} keyboardType='numeric' value={this.getDetails('section')} onChangeText={value => this.onChange('section', value)} maxLength={4} /></View>
                </View>
                <View style={styles.button}>
                    <Button title="Submit" color={css.colours.button} onPress={this.onSubmit}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: css.colours.background,
        height: '100%'
    },
    allCriteria: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    dropdown: {
        marginBottom: css.lengths.betweenInputs
    },
    textInput: {
        height: css.lengths.inputHeight,
        width: css.lengths.inputWidth,
        backgroundColor: css.colours.input,
        borderColor: css.colours.inputBorder,
        borderWidth: 1,
        marginBottom: css.lengths.betweenInputs,
        paddingLeft: 10
    },
    label: {
        color: css.colours.text,
        textAlign: 'left'
    },
    button: {
        flex: 1,
        width: css.lengths.buttonWidth

    }
})
