import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { withRouter } from "react-router-dom"
import Dropdown from '../utils/Dropdown'
import css from '../utils/css';
import constants, { labels } from '../utils/constants'
import requests from '../utils/requests';

class Notify extends React.Component {

    constructor(props) {
        super(props)

        let _this = this
        _this.state = {
            showModal: false,
            userLoaded: false,
            criteria: []
        }
        requests.getUser((user) => {
            let criteria = user && user.data && user.data.criteria ? user.data.criteria : []
            _this.state.criteria = criteria
            _this.state.userLoaded = true
            _this.forceUpdate()
            console.log(user, _this.state)
        })
    }

    handleClose = () => {
        this.state.showModal = false
        delete this.state.newCourse
        this.setState(this.state)
    }

    handleAddCourse = () => {
        let criteria = this.state.criteria
        let newCourse = this.state.newCourse
        criteria.push(newCourse)
        this.setState({ criteria })
        this.handleClose()
    }

    inputOnChange = (label, value) => {
        let newCourse = this.state.newCourse ? this.state.newCourse : {}
        newCourse[label] = value
        if (value === 'any' || value === '') {
            delete newCourse[label]
        }
        this.setState({ newCourse })
    }

    openModal = () => {
        this.setState({ showModal: true })
    }

    getLabel = (type, value) => {
        return labels[type][value]
    }

    saveChanges = () => {
        let criteria = this.state.criteria
        console.log(criteria)
        let history = this.props.history

        requests.getUser(user => {
            let body = { data: { fcm_tokens: [] } }
            body.data.fcm_tokens = user.data.fcm_tokens
            body.data.criteria = criteria
            requests.saveUser(body)
        }, () => history.push('/login'))

    }

    render() {

        if (!this.state.userLoaded) {
            return (<div></div>)
        }

        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <header>These are the current courses you are watching</header>
                    <header>Edit them as you please.</header>
                </div>

                <div style={styles.formWrapper}>
                    <div style={styles.criteriaWrapper}>
                        {Array.apply(null, { length: this.state.criteria.length }).map(Number.call, index => {
                            let elem = this.state.criteria[index]
                            return (
                                <div key={index} style={styles.singleCriteria}>
                                    <div style={styles.detail}>{elem.department ? this.getLabel('departments', elem.department) : 'Any'}</div>
                                    <div style={styles.detail}>{elem.level ? this.getLabel('levels', elem.level) : 'Any'}</div>
                                    <div style={styles.detail}>{elem.course ? elem.course : 'Any'}</div>
                                    <div style={styles.detail}>{elem.section ? elem.section : 'Any'}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={styles.message}>{this.state.message}</div>
                    <div style={styles.button}><Button color="primary" onClick={this.openModal}>Add Course</Button></div>
                    <div style={styles.button}><Button color="primary" onClick={this.saveChanges}>Save Changes</Button></div>
                </div>

                <Modal isOpen={this.state.showModal} className={this.props.className}>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        <div style={styles.courseWrapper}>
                            <div style={styles.courseInput}>Department<Dropdown items={constants.departments} type="department" onChange={this.inputOnChange} /></div>
                            <div style={styles.courseInput}>Level<Dropdown items={constants.levels} type="level" onChange={this.inputOnChange} /></div>
                            <div style={styles.courseInput}>Course #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('course', event.target.value)}></input></div>
                            <div style={styles.courseInput}>Section #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('section', event.target.value)}></input></div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button color="primary" onClick={this.handleAddCourse}>Add Course</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Notify)

const styles = {
    container: {
        paddingTop: 50
    },
    header: {
        color: css.colours.text,
        fontSize: 20
    },
    formWrapper: {
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '40px',
        marginTop: '20px',
        border: '1px solid #ccc'
    },
    button: {
        padding: 10
    },
    courseWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    courseInput: {
        padding: '10px',
        width: '200px'
    },
    criteriaWrapper: {
        color: css.colours.text,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    singleCriteria: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detail: {
        padding: '20px'
    },
    message: {
        color: css.colours.text
    }
}