import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { withRouter } from "react-router-dom"

class ConfirmModal extends React.Component {

    handleConfirm = () => {
        this.props.onConfirm(this.props.data)
        this.props.close()
    }

    render() {
        return (
            <Modal isOpen={this.props.show}>
                <ModalHeader>{this.props.title ? this.props.title : 'Confirm Delete'}</ModalHeader>
                <ModalBody>
                    {this.props.body ? this.props.body : 'Are you sure?'}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                    <Button color="danger" onClick={this.handleConfirm}>Delete</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(ConfirmModal)
