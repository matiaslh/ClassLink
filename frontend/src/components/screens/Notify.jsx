import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { withRouter } from "react-router-dom"
import Dropdown from '../utils/Dropdown'
import css from '../utils/css';
import constants from '../utils/constants'

class Notify extends React.Component {

    state = {
        showModal: false
    }

    handleClose = () => {
        console.log(this.state)
        this.setState({ showModal: false })
    }

    inputOnChange = (label, value) => {
        this.setState({[label]:value})
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <header>These are the current courses you are watching</header>
                    <header>Edit them as you please.</header>
                </div>
                <div style={styles.formWrapper}>
                    <div style={styles.button}><Button color="primary" onClick={() => this.setState({ showModal: true })}>Add Course</Button></div>
                    <div style={styles.button}><Button color="primary">Save Changes</Button></div>
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
                        <Button color="primary" onClick={this.handleClose}>Add Course</Button>{' '}
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
    }
}