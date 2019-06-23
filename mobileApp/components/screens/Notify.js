import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../utils/Header'
import requests from '../utils/requests'
import css from '../utils/css'
import { labels } from '../utils/constants';
import getNavigationOptions from '../utils/navigation'

export default class Notify extends React.Component {
    static navigationOptions = () => {
        return getNavigationOptions({ title: 'NotifyMe Courses' })
    }

    constructor(props) {
        super(props)
        let criteria = props.navigation.getParam('criteria', [])
        this.state = { criteria }
    }

    saveUser = () => {
        console.log(this.state)
    }

    deleteCriteria = (index) => {
        let criteria = this.state.criteria
        criteria.splice(index, 1)
        this.setState({ criteria })
    }

    getLabel(index, type) {
        if (type === 'department') {
            return this.state.criteria[index].department ? labels.departments[this.state.criteria[index].department] : 'Any'
        } else if (type === 'level') {
            return this.state.criteria[index].level ? labels.levels[this.state.criteria[index].level] : 'Any'
        } else if (type === 'course') {
            return this.state.criteria[index].course ? this.state.criteria[index].course : 'Any'
        } else if (type === 'section') {
            return this.state.criteria[index].section ? this.state.criteria[index].section : 'Any'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header pageName="Notify" />
                </View>
                <View style={styles.allCriteria}>
                    {Array.apply(null, { length: this.state.criteria.length }).map(Number.call, index => {
                        return (
                            <View key={index} style={styles.criteriaRow}>
                                <View style={styles.info}>
                                    <View style={styles.cellDropdown}><Text style={styles.text} numberOfLines={1}>{this.getLabel(index, 'department')}</Text></View>
                                    <View style={styles.cellDropdown}><Text style={styles.text} numberOfLines={1}>{this.getLabel(index, 'level')}</Text></View>
                                    <View style={styles.cellInput}><Text style={styles.text} numberOfLines={1}>{this.getLabel(index, 'course')}</Text></View>
                                    <View style={styles.cellInput}><Text style={styles.text} numberOfLines={1}>{this.getLabel(index, 'section')}</Text></View>
                                </View>
                                <View style={styles.editOrDeleteButtons}>
                                    <View style={styles.cellButton}><Icon name='edit' type='material' color={css.colours.button} onPress={() => this.props.navigation.navigate('EditCourse', { criteria: this.state.criteria, index })} /></View>
                                    <View style={styles.cellButton}><Icon name='clear' type='material' color={css.colours.button} onPress={() => this.deleteCriteria(index)} /></View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.button}><Button title="Add Course" color={css.colours.button} disabled={this.state.criteria.length >= 5} onPress={() => this.props.navigation.navigate('EditCourse', { criteria: this.state.criteria })}></Button></View>
                    <View style={styles.button}><Button title="Save" color={css.colours.button} onPress={this.saveUser}></Button></View>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: css.colours.criteriaBorder
    },
    editOrDeleteButtons: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5
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
        margin: 4,
        alignItems: 'flex-start'
    },
    button: {
        marginTop: css.lengths.betweenButtons,
        width: css.lengths.buttonWidth
    }
})

