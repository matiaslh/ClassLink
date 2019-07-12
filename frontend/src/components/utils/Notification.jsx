import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { withRouter } from "react-router-dom"

class Notification extends React.Component {

    render() {
        return (
            <div>
                {this.props.message && <Modal isOpen={true}>
                    <ModalHeader>{this.props.message.notification.title}</ModalHeader>
                    <ModalBody>
                        {this.props.message.notification.body}
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.handleClose}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>}
            </div>
        )
    }
}

export default withRouter(Notification)
