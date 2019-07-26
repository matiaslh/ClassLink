import React from 'react';
import { withRouter } from "react-router-dom"
import { getAllSchedules, getStoredSchedules, clearSchedules } from '../utils/scheduleHandler'

class Scheduler extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            schedules: getStoredSchedules()
        }
    }

    removeSchedules = () => {
        clearSchedules()
        this.setState({ schedules: [] })
    }

    getNewSchedules = async () => {
        console.log(this.state)

        //{ "department": "CIS", "course": "1300" }
        //{ "department": "CIS", "course": "2750" }
        //{ "department": "MATH", "course": "1030" }
        //{ "department": "MATH", "course": "1160" }
        //{ "department": "CIS", "course": "1910" }

        let schedules = this.state.schedules
        let newCourse = JSON.parse(this.state.newCourse)
        let newSchedules = await getAllSchedules(schedules, newCourse)
        console.log(schedules)
        this.setState({ schedules: newSchedules })
    }

    render() {
        return (
            <>
                <div>
                    <input onChange={(e) => this.setState({ newCourse: e.target.value })} ></input>
                    <button onClick={this.getNewSchedules}>SUBMIT</button>
                    <button onClick={this.removeSchedules}>CLEAR ALL SCHEDULES</button>
                </div>
                <div>
                    {JSON.stringify(this.state)}
                </div>
            </>
        )
    }
}

export default withRouter(Scheduler)

const styles = {

}
