import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { withRouter } from "react-router-dom"
import Dropdown from '../utils/Dropdown'
import constants from '../utils/constants'
import css from '../utils/css';

class CourseModal extends React.Component {

    state = {
        content: {}
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.show === false && newProps.show === true) {
            this.setState({ content: Object.assign({}, newProps.content), error: undefined })
        }
    }

    inputOnChange = (label, value) => {
        let content = this.state.content
        content[label] = value
        if (value === 'any' || value === '') {
            delete content[label]
        }
        this.setState({ content, error: undefined })
    }

    closeModal = () => {
        this.setState({ content: {} })
        this.props.close()
    }

    handleSave = () => {

        let content = this.state.content

        if (!content || Object.keys(content).length === 0) {
            this.setState({ error: 'You must select at least one value' })
            return;
        }

        this.props.save(content)
        this.closeModal()
    }

    render() {
        return (
            <Modal isOpen={this.props.show}>
                <ModalHeader>{this.props.action === 'add' ? 'Add Course' : 'Edit Course'}</ModalHeader>
                <ModalBody>
                    <div style={styles.courseWrapper}>
                        <div style={styles.courseInput}>Department<Dropdown items={constants.departments} type="department" onChange={this.inputOnChange} default={this.state.content.department} /></div>
                        <div style={styles.courseInput}>Level<Dropdown items={constants.levels} type="level" onChange={this.inputOnChange} default={this.state.content.level} /></div>
                        <div style={styles.courseInput}>Course #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('course', event.target.value)} defaultValue={this.state.content.course}></input></div>
                        <div style={styles.courseInput}>Section #<input type="text" maxLength={4} onChange={(event) => this.inputOnChange('section', event.target.value)} defaultValue={this.state.content.section}></input></div>
                    </div>
                    <div style={{ textAlign: 'center', color: css.colours.errorText }}>{this.state.error}</div>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                    <Button color="primary" onClick={this.handleSave}>Save</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(CourseModal)

const styles = {
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