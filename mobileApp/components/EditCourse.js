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
        this.state = navigation.getParam('criteria', {})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="EditCourse" />
                </View>
                <View style={styles.allCriteria}>
                    <Text style={styles.label}>Department</Text>
                    <View style={styles.dropdown}><Dropdown name="department" items={constants.departments} value={this.state.department} onChange={department => this.setState({ department })} /></View>
                    <Text style={styles.label}>Level</Text>
                    <View style={styles.dropdown}><Dropdown name="level" items={constants.levels} value={this.state.level} onChange={level => this.setState({ level })} /></View>
                    <Text style={styles.label}>Course</Text>
                    <View><TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(course) => this.setState({ course })} value={this.state.course} maxLength={4} /></View>
                    <Text style={styles.label}>Section</Text>
                    <View><TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(section) => this.setState({ section })} value={this.state.section} maxLength={4} /></View>
                </View>
                <View style={{ flex: 1 }}>
                    <Button title="Submit" color={css.colours.button} onPress={() => this.props.navigation.navigate('Notify')}></Button>
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
        marginBottom: 12
    },
    label: {
        color: css.colours.text,
        textAlign: 'left'
    }
})
