import React from 'react';
import { withRouter } from "react-router-dom"
import { getAllSchedules, clearCourses, getInitialSchedules } from '../utils/scheduleHandler'
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from 'react-agenda';

let monday = new Date('07/22/2019')

var colors = {
    'color-1': "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)"
}

class SchedulerDisplay extends React.Component {

    constructor(props) {
        super(props)
    }

    async componentWillMount(){
        this.setState({
            selected: [],
            cellHeight: 8,
            showModal: false,
            locale: "us",
            rowsPerHour: 6,
            numberOfDays: 5,
            startDate: monday,
            schedules: await getInitialSchedules(),
            headFormat: "ddd"
        })
        this.loadSchedules()
    }

    getScheduleIndex = (schedules, i) => {
        let items = []
        let keys = Object.keys(schedules[i])
        for (let j = 0; j < keys.length; j++) {
            let currDay = schedules[i][keys[j]]
            for (let k = 0; k < currDay.length; k++) {
                let currTime = currDay[k]
                let item = {
                    _id: guid(),
                    name: currTime.meeting.room,
                    startDateTime: this.getTime(keys[j], currTime.start),
                    endDateTime: this.getTime(keys[j], currTime.end),
                    classes: `color-${1}`
                }
                items.push(item)
            }
        }
        return items
    }

    loadSchedules = () => {
        let schedules = this.state.schedules
        let items = schedules.length === 0 ? [] : this.getScheduleIndex(schedules, 0)
        this.setState({
            schedules,
            items
        })
    }

    getTime = (day, time) => {
        let daysToAdd = 0
        switch (day) {
            case 'Tues':
                daysToAdd = 1
                break
            case 'Wed':
                daysToAdd = 2
                break
            case 'Thur':
                daysToAdd = 3
                break
            case 'Fri':
                daysToAdd = 4
                break
        }
        return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + daysToAdd, time / 100, time % 100)
    }

    removeSchedules = () => {
        clearCourses()
        this.setState({ schedules: [] })
    }

    getNewSchedules = async () => {

        // { "department": "CIS", "course": "1300" }
        // { "department": "CIS", "course": "2750" }
        // { "department": "MATH", "course": "1030" }
        // { "department": "MATH", "course": "1160" }
        // { "department": "CIS", "course": "1910" }

        let schedules = this.state.schedules
        let newCourse = JSON.parse(this.state.newCourse)
        let newSchedules = await getAllSchedules(schedules, newCourse)
        this.setState({ schedules: newSchedules })
        this.loadSchedules()
        console.log(this.state)
    }
    handleCellSelection(item) {
        console.log('handleCellSelection', item)
    }
    handleItemEdit(item) {
        console.log('handleItemEdit', item)
    }
    handleRangeSelection(item) {
        console.log('handleRangeSelection', item)
    }

    render() {
        if (!this.state) {
            return (<></>)
        }
        return (
            <>
                <div>
                    <input onChange={(e) => this.setState({ newCourse: e.target.value })} ></input>
                    <button onClick={this.getNewSchedules}>SUBMIT</button>
                    <button onClick={this.removeSchedules}>CLEAR ALL SCHEDULES</button>
                </div>
                <div>
                </div>
                <ReactAgenda
                    minDate={monday}
                    maxDate={new Date(monday.getFullYear(), monday.getMonth() + 3)}
                    disablePrevButton={true}
                    startDate={this.state.startDate}
                    cellHeight={this.state.cellHeight}
                    locale={this.state.locale}
                    items={this.state.items}
                    numberOfDays={this.state.numberOfDays}
                    rowsPerHour={this.state.rowsPerHour}
                    itemColors={colors}
                    autoScale={false}
                    fixedHeader={true}
                    headFormat={this.state.headFormat}
                // onItemEdit={this.handleItemEdit.bind(this)}
                // onCellSelect={this.handleCellSelection.bind(this)}
                // onRangeSelection={this.handleRangeSelection.bind(this)}
                />
            </>
        )
    }
}

export default withRouter(SchedulerDisplay)

const styles = {

}
