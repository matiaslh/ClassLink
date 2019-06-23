import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header'
import css from './css'
import constants from './constants';

export default class Notify extends React.Component {
    static navigationOptions = {
        title: 'NotifyMe Courses'
    }

    state = {
        criteria: [
            {
                department: 'ENGG',
                level: '200',
                course: '1000',
                section: '2000'
            },
            {
                department: 'CIS',
                level: '200',
                course: '1010',
                section: '2030'
            },
            {
                department: 'CIS',
                level: '200',
                course: '1010',
                section: '2030'
            },
            {
                department: 'CIS',
                level: '200',
                course: '1010',
                section: '2030'
            }
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="Notify" />
                </View>
                <View style={styles.allCriteria}>
                    {Array.apply(null, { length: this.state.criteria.length }).map(Number.call, index => {
                        return (
                            <View key={index} style={styles.criteriaRow}>
                                <View style={styles.cellDropdown}><Text style={styles.text}>{constants.departments[this.state.criteria[index].department]}</Text></View>
                                <View style={styles.cellDropdown}><Text style={styles.text}>{constants.levels[this.state.criteria[index].level]}</Text></View>
                                <View style={styles.cellInput}><Text style={styles.text}>{this.state.criteria[index].course}</Text></View>
                                <View style={styles.cellInput}><Text style={styles.text}>{this.state.criteria[index].section}</Text></View>
                                <View style={styles.cellEditButton}><Icon name='edit' type='material' color={css.colours.button} onPress={() => this.props.navigation.navigate('EditCourse', { criteria: this.state.criteria[index] })} /></View>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.addCourseButton}>
                    {this.state.criteria.length <= 4 && <Button title="Add Course" color={css.colours.button} onPress={() => this.props.navigation.navigate('EditCourse')}></Button>}
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
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10
    },
    criteriaRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: css.colours.text,
    },
    cellDropdown: {
        flex: 2,
        margin: 10,
        alignItems: 'flex-start'
    },
    cellInput: {
        flex: 1,
        margin: 10,
        alignItems: 'flex-start'
    },
    cellEditButton: {
        flex: 1,
        margin: 10,
        alignItems: 'flex-start'
    },
    addCourseButton: {
        flex: 1
    }
})

