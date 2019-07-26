import React from 'react';
import { withRouter } from "react-router-dom"
import requests from '../utils/requests'

class Scheduler extends React.Component {

    state = {
        schedules: []
    }

    getNewSchedules = async () => {
        console.log(this.state)
        let schedules = this.state.schedules

        //{ "department": "CIS", "course": "1300" }
        //{ "department": "CIS", "course": "2750" }
        //{ "department": "MATH", "course": "1030" }
        //{ "department": "MATH", "course": "1160" }
        //{ "department": "CIS", "course": "1910" }


        let newCourse = JSON.parse(this.state.newCourse)
        let response = await requests.scheduleSearch(schedules, newCourse)
        console.log(response.schedules)
        this.setState({ schedules: response.schedules })
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.setState({ newCourse: e.target.value })} ></input>
                <button onClick={this.getNewSchedules}>SUBMIT</button>
            </div>
        )
    }
}

export default withRouter(Scheduler)

const styles = {

}
