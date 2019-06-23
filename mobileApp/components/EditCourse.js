import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './css'
import constants from './constants'
import Header from './Header'
import Dropdown from './Dropdown'

export default class EditCourse extends React.Component {
    static navigationOptions = {
        title: 'Edit Course'
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
                <View style={styles.headerView}>
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
                <View style={{ flex: 1 }}>
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
    headerView: {
        flex: 1
    },
    allCriteria: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    dropdown: {
        marginBottom: 12
    },
    textInput: {
        height: 40,
        width: 200,
        backgroundColor: css.colours.input,
        borderColor: css.colours.inputBorder,
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10
    },
    label: {
        color: css.colours.text,
        textAlign: 'left'
    }
})
