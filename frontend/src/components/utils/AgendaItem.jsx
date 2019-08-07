import moment from 'moment'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mapToRange } from './helpers'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ReactAgendaItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            wrapper: {
                width: '150px',
                marginLeft: '0px',
                zIndex: 5,
                borderLeft: null
            },
            controls: {}
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    updateDimensions = () => {
        let lengthClass = this.props.item.duration._milliseconds

        // check if 50 mins 
        if (lengthClass === 3000000) {
            let element = document.getElementById(this.props.parent)
            let arr = Array.from(element.parentElement.children)
            let col = arr.indexOf(element)
            let rows = element.parentElement.parentElement.children
            arr = Array.from(rows)
            let row = arr.indexOf(element.parentElement) + 5
            let lastCell = rows[row].children.item(col)
            lastCell.style.background = null

            const colourClass = new RegExp(/\bcolour-.+?\b/, 'g');
            lastCell.className = lastCell.className.replace(colourClass, '')
        }

        var elem = document.getElementById(this.props.parent)
        if (elem) {
            var nwidh = (elem.offsetWidth / 1.4)
            var nmrgl = this.props.padder > 0
                ? (nwidh / 5) + this.props.padder * 8
                : (nwidh / 5)

            return this.setState({
                wrapper: {
                    width: nwidh + 'px',
                    // height: '100px',
                    marginLeft: nmrgl + 'px',
                    marginTop: (this.props.padder * 8) + 'px',
                    zIndex: 5,
                }
            })
        }
    }

    cellClicked = () => {
        console.log(this.props.item.section)
    }

    componentWillReceiveProps(props, next) {
        setTimeout(function () {
            this.updateDimensions();
        }.bind(this), 50);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    lowerZindex = (e) => {
        let sty = this.state.wrapper;
        if (sty.zIndex === 8) {
            var newState = { wrapper: Object.assign({}, sty, { zIndex: 5 }) };
            return this.setState(newState)
        }

    }
    raiseZindex = (e) => {
        let sty = this.state.wrapper;
        if (sty.zIndex === 5) {
            var newState = { wrapper: Object.assign({}, sty, { zIndex: 8 }) };
            return this.setState(newState)
        }
    }

    render() {

        var duratL = moment(this.props.item.startDateTime).format("HH:mm")
        var duratE = moment(this.props.item.endDateTime).format("HH:mm")

        var marginTop = mapToRange(this.props.item.duration._milliseconds, 3000000, 10200000, 1, 48) + 'px'
        var paddingVert = '1px'
        var paddingHoriz = '7px'

        return <div
            style={{ ...this.state.wrapper, marginTop }}
            className="agenda-cell-item"
            onMouseEnter={this.raiseZindex}
            onMouseLeave={this.lowerZindex}
            onClick={this.toggle}>

            <div className="agenda-controls-item" style={this.state.controls}>
                {/* {this.props.edit ?
                    <div className="agenda-edit-event">
                        <a onClick={() => this.props.edit(this.props.item)} className="agenda-edit-modele">
                            <i className="edit-item-icon"></i>
                        </a>
                    </div> : ''} */}
                {/* {this.props.remove ?
                    <div className="agenda-delete-event">
                        <a onClick={() => this.props.remove(this.props.item)} className="agenda-delete-modele">
                            <i className="remove-item-icon"></i>
                        </a>
                    </div> : ''} */}
            </div>

            <div className="agenda-item-description" style={{ padding: `${paddingVert} ${paddingHoriz} ${paddingVert} ${paddingHoriz}` }}>
                <section>{this.props.item.name}</section>
                <small>
                    {duratL} - {duratE}
                </small>
            </div>
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>{this.props.title ? this.props.title : 'Confirm Delete'}</ModalHeader>
                    <ModalBody>
                        {JSON.stringify(this.props.item.section)}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>

    }
}

ReactAgendaItem.propTypes = {
    parent: PropTypes.string,
    item: PropTypes.object,
    padder: PropTypes.number,
    edit: PropTypes.func,
    remove: PropTypes.func

};

ReactAgendaItem.defaultProps = {
    parent: 'body',
    item: {},
    padder: 0
}