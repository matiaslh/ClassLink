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
                    {Array.apply(null, { length: this.state.criteriaLength }).map(Number.call, index => {
                        return (<View key={index} style={styles.criteriaRow}>
                            <View style={styles.dropdown}><Dropdown title="Department" items={departments} /></View>
                            <View style={styles.dropdown}><Dropdown title="Department" items={departments} /></View>
                            <View style={{ flex: 1 }}><TextInput style={styles.textInput} onChangeText={(course) => this.setState({ course })} value={this.state.course} /></View>
                            <View style={{ flex: 1 }}><TextInput style={styles.textInput} onChangeText={(section) => this.setState({ section })} value={this.state.section} /></View>
                        </View>)
                    })}
                </View>
                <View style={styles.addCriteria}>
                    <View><Button title="+" onPress={() => this.setState({ criteriaLength: this.state.criteriaLength + 1 })}></Button></View>
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
    },
    criteriaRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10
    },
    dropdown: {
        flex: 2,
        marginLeft: 10
    },
    textInput: {
        height: 40,
        backgroundColor: css.colours.input,
        marginLeft: 10
    },
    addCriteria: {
        flex: 1,
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