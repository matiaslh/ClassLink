import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'
import Header from './Header'
import Dropdown from './Dropdown'

export default class Notify extends React.Component {
    static navigationOptions = {
        title: 'Notify'
    }

    state = {
        criteriaLength: 1
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="Notify" />
                </View>
                <View style={styles.allCriteria}>
                    {
                        new Array(this.state.criteriaLength).fill(
                            <View key="e" style={styles.dropdownView}>
                                <View style={{flex:2}}>
                                    <Dropdown style={styles.dropdown} title="Department" items={departments} />
                                    <Dropdown style={styles.dropdown} title="Department" items={departments} />
                                </View>
                                <View style={{flex:1}}>
                                    <TextInput style={styles.textInput} onChangeText={(course) => this.setState({ course })} value={this.state.course} />
                                    <TextInput style={styles.textInput} onChangeText={(section) => this.setState({ section })} value={this.state.section} />
                                </View>
                            </View>
                        )
                    }
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
        backgroundColor: css.colours.blue,
        height: '100%',
    },
    headerView: {
        flex: 1
    },
    allCriteria: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: css.colours.blue
    },
    dropdownView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropdown: {
    },
    textInput: {
        height: 40,
        backgroundColor: css.colours.white,
        marginLeft: '5%'
    }
})

const departments = [
    {
        label: 'Computer Science',
        value: 'CIS'
    },
    {
        label: 'Engineering',
        value: 'ENGG'
    }
]