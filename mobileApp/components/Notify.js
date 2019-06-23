import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header'
import requests from './requests'
import css from './css'
import { labels } from './constants';

export default class Notify extends React.Component {

    static navigationOptions = {
        title: 'NotifyMe Courses'
    }

    constructor(props) {
        super(props)
        let criteria;
        requests.getUser(user => {
            criteria = user.criteria
        }, console.error)
        this.state = { criteria }
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
                                <View style={styles.info}>
                                    <View style={styles.cellDropdown}><Text style={styles.text}>{labels.departments[this.state.criteria[index].department]}</Text></View>
                                    <View style={styles.cellDropdown}><Text style={styles.text}>{labels.levels[this.state.criteria[index].level]}</Text></View>
                                    <View style={styles.cellInput}><Text style={styles.text}>{this.state.criteria[index].course}</Text></View>
                                    <View style={styles.cellInput}><Text style={styles.text}>{this.state.criteria[index].section}</Text></View>
                                </View>
                                <View style={styles.buttons}>
                                    <View style={styles.cellButton}><Icon name='edit' type='material' color={css.colours.button} onPress={() => this.props.navigation.navigate('EditCourse', { criteria: this.state.criteria[index] })} /></View>
                                    <View style={styles.cellButton}><Icon name='clear' type='material' color={css.colours.button} onPress={() => this.props.navigation.navigate('EditCourse', { criteria: this.state.criteria[index] })} /></View>

                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.addCourseButton}>
                    <Button title="Add Course" color={css.colours.button} disabled={this.state.criteria.length >= 5} onPress={() => this.props.navigation.navigate('EditCourse')}></Button>
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
        marginLeft: 20,
        marginRight: 10
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
    info: {
        flex: 5,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'blue'
    },
    buttons: {
        flex: 1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
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
    cellButton: {
        flex: 1,
        margin:4,
        alignItems: 'flex-start'
    },
    addCourseButton: {
        flex: 1,
        marginTop:20
    }
})

