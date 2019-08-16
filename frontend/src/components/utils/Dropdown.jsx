import React from 'react';
// import { Dropdown as StrapDropDown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { withRouter } from "react-router-dom"
import { Menu, Dropdown, Button } from 'antd'

class DropdownMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: props.default ? props.default : undefined
        }
    }

    onSelect = (event) => {
        this.setState({ selected: event.currentTarget.getAttribute('label') })
        this.props.onChange(this.props.type, event.currentTarget.value)
    }

    getSelected = () => {
        return (this.state.selected) ? this.state.selected : this.props.items[0][Object.keys(this.props.items[0])]
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    getMenu = () => {
        return (
            <Menu>
                {this.props.items.map((entry, index) => {
                    let value = Object.keys(entry)[0]
                    let label = (index === 0) ? entry[value] : value + ' - ' + entry[value]
                    return (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                1st menu item
                            </a>
                        </Menu.Item>)
                    })}   
            </Menu>
        )
    }

    render() {
        return (
            // <StrapDropDown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            //     <DropdownToggle color="primary" style={styles.button} caret>{this.getSelected()}</DropdownToggle>
            //     <DropdownMenu style={styles.menu}>
            //         {this.props.items.map((entry, index) => {
            //             let value = Object.keys(entry)[0]
            //             let label = (index === 0) ? entry[value] : value + ' - ' + entry[value]
            //             return (<DropdownItem key={index} label={entry[value]} value={value} onClick={this.onSelect}>{label}</DropdownItem>)
            //         })}
            //     </DropdownMenu>
            // </StrapDropDown>
            <Dropdown overlay={this.getMenu} placement="bottomCenter">
                <Button>bottomCenter</Button>
            </Dropdown>
        )
    }
}

export default withRouter(DropdownMenu)

const styles = {
    menu: {
        maxHeight: "500px",
        overflowY: 'scroll'
    },
    button: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        display: 'block',
        overflow: 'hidden'
    }
}