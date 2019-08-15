import React from 'react';
import { Button } from 'antd';
import { withRouter } from "react-router-dom"
import { withAlert } from 'react-alert'
import css from '../utils/css';
import { labels } from '../utils/constants'
import requests from '../utils/requests';
import messaging from '../utils/firebase-messaging-config'
import Notification from '../utils/Notification'
import CourseModal from '../utils/CourseModal'
import ConfirmModal from '../utils/ConfirmModal'
import { Table, Divider, Tag } from 'antd'
import '../utils/styles/table.css'
import colours from '../utils/css'
import Menu from '../utils/Menu'

const { Column, ColumnGroup } = Table;

class Notify extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            modal: {
                show: false
            },
            confirmModal: {
                show: false
            },
            userLoaded: false,
            criteria: [{ department: 'CIS' }],
        }
        requests.getUser().then(response => {
            if (response.status === 'Success') {
                let user = response.info
                let criteria = user && user.data && user.data.criteria ? user.data.criteria : []
                let history = user && user.data && user.data.history ? user.data.history : []
                this.state.criteria = criteria
                this.state.history = history
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

    getLabel = (type, value) => {
        if (!value) return 'Any'
        return labels[type][value]
    }

    getContentForModal = () => {
        let action = this.state.modal.action
        if (action === 'add') {
            return {}
        } else if (action === 'edit') {
            return this.state.criteria[this.state.modal.index]
        }
    }

    handleDelete = (index) => {
        let criteria = this.state.criteria
        criteria.splice(index, 1)
        this.saveUser()
    }

    saveChanges = async (content) => {

        let index = this.state.modal.index
        let criteria = this.state.criteria

        if (index !== undefined) {
            // editing an existing object
            criteria[index] = content
        } else {
            // new criteria object
            criteria.push(content)
        }
        this.saveUser()
    }

    saveUser = async () => {

        let criteria = this.state.criteria
        let response = await requests.getUser()

        if (response.status === 'Success') {
            let user = response.info
            let body = {
                data: {
                    fcm_tokens: user.data.fcm_tokens ? user.data.fcm_tokens : [],
                    criteria
                }
            }
            let message = await requests.saveUser(body)
            if (message.status === 'Success') {
                this.props.alert.show('Updated Successfully')
            } else {
                this.props.alert.show('Error Saving Course')
            }
        } else {
            this.props.history.push('/login')
        }
    }

    render() {

        if (!this.state.userLoaded) {
            return (<div></div>)
        }

        return (

            <div style={{display: 'flex', flexDirection: 'row'}}>
                
                <div style={styles.nav}>
                    <Menu />
                </div>

                <div style={styles.container}>

                    <CourseModal action={this.state.modal.action} content={this.getContentForModal()} save={this.saveChanges} close={() => this.setState({ modal: { show: false } })} show={this.state.modal.show} />

                    <ConfirmModal onConfirm={this.handleDelete} close={() => this.setState({ confirmModal: { show: false } })} show={this.state.confirmModal.show} data={this.state.confirmModal.index} />

                    <div style={styles.top}>
                        <div>
                            <h4 style={{ fontSize: '30px', color: colours.colours.primary }}>Dashboard</h4>
                        </div>
                        <div>
                            <div><Button style={styles.button} color="primary" icon="search" onClick={() => this.setState({ modal: { show: true, action: 'add' } })} disabled={this.state.criteria.length >= 5}>Add Course</Button></div>
                        </div>
                    </div>

                    <h5 style={styles.heading}>In Progress</h5>

                    <Table dataSource={this.state.criteria}>
                        <Column title="Course Code" dataIndex="department" key="department" />
                        <Column title="Course Level" dataIndex="level" key="level" />
                        <Column title="Course Number" dataIndex="course" key="course" />
                        <Column title="Section Number" dataIndex="section" key="section" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record, index) => (
                                <span style={styles.buttons}>
                                    <a onClick={() => this.setState({ modal: { show: true, action: 'edit', index } })}>Edit</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => this.setState({ confirmModal: { show: true, index } })}>Delete</a>
                                </span>
                            )}
                        />
                    </Table>

                    {/* <Table responsive>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Level</th>
                            <th>Course #</th>
                            <th>Section #</th>
                            <th>Previous Search</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.criteria.length > 0 ? this.state.criteria.map((obj, index) => (
                            <tr key={index}>
                                <td>{this.getLabel('departments', obj.department)}</td>
                                <td>{this.getLabel('levels', obj.level)}</td>
                                <td>{obj.course ? obj.course : 'Any'}</td>
                                <td>{obj.section ? obj.section : 'Any'}</td>
                                <td>{new Date().toLocaleString()}</td>
                                <td><Button onClick={() => this.setState({ modal: { show: true, action: 'edit', index } })}>Edit</Button><Button onClick={() => this.setState({ confirmModal: { show: true, index } })}>Delete</Button></td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table> */}

                    <h5 style={styles.heading}>Completed</h5>

                    <Table dataSource={this.state.history}>
                        <Column title="Course Code" dataIndex="department" key="department" />
                        <Column title="Course Level" dataIndex="level" key="level" />
                        <Column title="Course Number" dataIndex="course" key="course" />
                        <Column title="Section Number" dataIndex="section" key="section" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record, index) => (
                                <span style={styles.buttons}>
                                    <a onClick={() => this.setState({ modal: { show: true, action: 'edit', index } })}>Edit</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => this.setState({ confirmModal: { show: true, index } })}>Delete</a>
                                </span>
                            )}
                        />
                    </Table>

                    {/* <Table responsive>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Level</th>
                            <th>Course #</th>
                            <th>Section #</th>
                            <th>Status</th>
                            <th>Completed On</th>
                        </tr>
                    </thead> */}
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
                    {/* </Table> */}

                    <Notification message={this.state.notification} handleClose={() => this.setState({ notification: undefined })} />

                </div>
            </div>
        )
    }
}

export default withAlert()(withRouter(Notify))

const styles = {
    container: {
        width: '80%',
        margin: '0px auto',
        fontFamily: 'Montserrat'
    },
    button: {
        border: 'none',
        color: 'white',
        backgroundColor: colours.colours.primary,
        height: '40px',
        display: 'flex',
        alignItems: 'center'
    },
    buttonColours: {
        backgroundColor: colours.colours.primary,
        border: 'none',
    },
    criteriaWrapper: {
        color: colours.colours.text,
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
        color: colours.colours.secondary,
        float: 'left',
        paddingTop: '30px'
    },
    top: {
        color: '#00b3b3',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '60px',
        flexWrap: 'wrap'
    },
    buttons: {
        color: colours.colours.primary
    },
    nav: {
        width: '10%',
        height: '82vh',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-start'
    }
}