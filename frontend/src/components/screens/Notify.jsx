import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'reactstrap'
import { withRouter } from "react-router-dom"
import Dropdown from '../utils/Dropdown'
import css from '../utils/css';
import constants, { labels } from '../utils/constants'
import requests from '../utils/requests';
import messaging from '../utils/firebase-messaging-config'
import Notification from '../utils/Notification'
import { withAlert } from 'react-alert'

class Notify extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            userLoaded: false,
            criteria: [],
        }

        requests.getUser().then(response => {
            if (response.status === 'Success') {
                let user = response.info
                let criteria = user && user.data && user.data.criteria ? user.data.criteria : []
                this.state.criteria = criteria
                this.state.userLoaded = true
                this.forceUpdate()
            } else {
                props.history.push('/login')
            }
        })
    }

    componentDidMount() {
        if (messaging) {
            messaging.onMessage(payload => {
                this.setState({ notification: payload, criteria: [] })
            })
        }
    }

    handleClose = () => {
        let currState = this.state
        currState.showModal = false
        delete currState.newCourse
        this.setState(currState)
    }

    handleAddCourse = () => {

        let criteria = this.state.criteria
        let newCourse = this.state.newCourse

        console.log(this.state)
        if (!newCourse) {
            this.setState({ newCourseError: 'You must select at least one value' })
            return;
        }

        criteria.push(newCourse)
        this.setState({ criteria })
        this.handleClose()
        this.saveChanges()
    }

    inputOnChange = (label, value) => {
        let newCourse = this.state.newCourse ? this.state.newCourse : {}
        newCourse[label] = value
        if (value === 'any' || value === '') {
            delete newCourse[label]
        }
        this.setState({ newCourse, newCourseError: undefined })
    }

    openModal = () => {
        this.setState({ showModal: true })
    }

    getLabel = (type, value) => {
        return labels[type][value]
    }

    saveChanges = async () => {
        let criteria = this.state.criteria
        let history = this.props.history

        let response = await requests.getUser()

        if (response.status === 'Success') {
            let user = response.info

            let body = { data: { fcm_tokens: [] } }
            body.data.fcm_tokens = user.data.fcm_tokens ? user.data.fcm_tokens : [];
            body.data.criteria = criteria
            let message = await requests.saveUser(body)
            if (message.status === 'Success') {
                this.props.alert.show(message.info)
            } else {
                this.props.alert.show(message.error)
            }

        } else {
            history.push('/login')
        }
    }

    render() {

        if (!this.state.userLoaded) {
            return (<div></div>)
        }

        return (

            <div style={styles.container}>
                <div style={styles.top}>
                    <div>
                        <h4 style={{ fontSize: '30px' }}>Dashboard</h4>
                    </div>
                    <div>
                        <div style={styles.button}><Button style={styles.buttonColours} color="primary" onClick={this.openModal} disabled={this.state.criteria.length >= 5}>Add Course</Button></div>
                    </div>
                </div>

                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>Add/Edit Course</ModalHeader>
                    <ModalBody>
                        <div style={styles.courseWrapper}>
                            <div style={styles.courseInput}>Department<Dropdown items={constants.departments} type="department" onChange={this.inputOnChange} /></div>
                            <div style={styles.courseInput}>Level<Dropdown items={constants.levels} type="level" onChange={this.inputOnChange} /></div>
                            <div style={styles.courseInput}>Course #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('course', event.target.value)}></input></div>
                            <div style={styles.courseInput}>Section #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('section', event.target.value)}></input></div>
                        </div>
                        <div  style={{textAlign:'center', color:css.colours.errorText}}>{this.state.newCourseError}</div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button color="primary" onClick={this.handleAddCourse}>Add Course</Button>{' '}
                    </ModalFooter>
                </Modal>

                <h5 style={styles.heading}>In Progress</h5>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Level</th>
                            <th>Course #</th>
                            <th>Section #</th>
                            <th>Previous Search</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.criteria.length > 0 ? this.state.criteria.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.department ? obj.department : 'Any'}</td>
                                <td>{obj.level ? obj.level : 'Any'}</td>
                                <td>{obj.course ? obj.course : 'Any'}</td>
                                <td>{obj.section ? obj.section : 'Any'}</td>
                                <td>{new Date().toLocaleString()}</td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>

                <h5 style={styles.heading}>Completed</h5>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Level</th>
                            <th>Course #</th>
                            <th>Section #</th>
                            <th>Status</th>
                            <th>Completed On</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {this.state.criteria.length > 0 ?  this.state.criteria.map(obj => (
                        <tr >
                            <td>{obj.department}</td>
                            <td>{obj.level ? obj.level : 'Any'}</td> 
                            <td>{obj.course ? obj.course : 'Any'}</td>
                            <td>{obj.section ? obj.section : 'Any'}</td>
                            <td>Searching</td>
                            <td>{new Date().toString()}</td>
                        </tr>
                        )): null}
                    </tbody> */}
                </Table>

                <Notification message={this.state.notification} handleClose={() => this.setState({ notification: undefined })} />

            </div>
        )
    }
}

export default withAlert()(withRouter(Notify))

const styles = {
    container: {
        width: '80%',
        margin: '0px auto'
    },
    header: {
        color: css.colours.text,
        fontSize: 20
    },
    button: {
        paddingLeft: '20px'
    },
    buttonColours: {
        backgroundColor: '#00b3b3'
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
    heading: {
        color: '#00b3b3',
        float: 'left',
        paddingTop: '30px'
    },
    top: {
        color: '#00b3b3',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px',
        flexWrap: 'wrap'
    }
}