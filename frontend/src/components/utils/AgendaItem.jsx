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

            if (this.props.item.startDateTime.getMinutes() === 0) {
                col--
            }

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

    lowerZindex = () => {
        let sty = this.state.wrapper;
        if (sty.zIndex === 8) {
            var newState = { wrapper: Object.assign({}, sty, { zIndex: 5 }) };
            return this.setState(newState)
        }

    }
    raiseZindex = () => {
        let sty = this.state.wrapper;
        if (sty.zIndex === 5) {
            var newState = { wrapper: Object.assign({}, sty, { zIndex: 8 }) };
            return this.setState(newState)
        }
    }

    render() {

        var duratL = moment(this.props.item.startDateTime).format("HH:mm")
        var duratE = moment(this.props.item.endDateTime).format("HH:mm")

        var marginTop = mapToRange(this.props.item.duration._milliseconds, 3000000, 10200000, 0, 10) + 'px'
        var paddingVert = mapToRange(this.props.item.duration._milliseconds, 3000000, 10200000, 1, 40) + 'px'
        var paddingHoriz = '10px'

        return <div
            style={{ ...this.state.wrapper, marginTop }}
            className="agenda-cell-item"
            onMouseEnter={this.raiseZindex}
            onMouseLeave={this.lowerZindex}
            onClick={this.toggle}>

            <div className="agenda-item-description" style={styles.item(paddingVert, paddingHoriz)}>
                <section>{this.props.item.name}</section>
                <small>
                    {duratL} - {duratE}
                </small>
            </div>
            <div>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>{this.props.title ? this.props.title : 'Course Info'}</ModalHeader>
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

const styles = {
    item: (paddingVert, paddingHoriz) => {
        return {
            padding: `${paddingVert} ${paddingHoriz} ${paddingVert} ${paddingHoriz}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: 'Montserrat'
        }
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