import React from 'react'
import { withRouter } from "react-router-dom"
import { getAllSchedules, clearCourses, getInitialSchedules, getCourses } from '../utils/scheduleHandler'
import { ReactAgenda, guid, Modal } from 'react-agenda'
import Thumbnail from '../utils/Thumbnail'
import AutoSuggest from '../utils/AutoSuggest'
import PaperSheet from '../utils/CourseCards'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'underscore'

const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']
const monday = new Date('07/22/2019')

const colours = {
    "colour-0": "rgba(242, 177, 52, 1)",
    'colour-1': "rgba(102, 195, 131 , 1)",
    "colour-2": "rgba(242, 177, 52, 1)",
    "colour-3": "rgba(235, 85, 59, 1)"
}

class SchedulerDisplay extends React.Component {

    constructor(props) {
        super(props)

        let selected = 0
        let courses = getCourses()
        this.state = {
            selected,
            courses,
            pagination: {
                start: 0,
                end: 10
            },
            thumbnail: {
                width: 150,
                height: 100
            }
        }
        getInitialSchedules().then(schedules => {
            this.attachScheduleItems(schedules)
            this.setState({
                schedules
            })
        })
    }

    getColourForCourse = (department, course) => {
        let colourIndex = _.findIndex(this.state.courses, { department, course })
        let key = 'colour-' + colourIndex
        return key
    }

    attachScheduleItems = (schedules) => {
        for (let i = this.state.pagination.start; i < schedules.length && i <= this.state.pagination.end; i++) {
            let currSchedule = schedules[i]
            let keys = Object.keys(currSchedule.days)
            currSchedule.items = []

            for (let j = 0; j < keys.length; j++) {
                let currDaySchedule = currSchedule.days[keys[j]]
                let currDay = keys[j]
                for (let k = 0; k < currDaySchedule.length; k++) {
                    let currTime = currDaySchedule[k]
                    let item = {
                        _id: guid(),
                        name: currTime.meeting.type + ' - ' + currTime.section.department + '*' + currTime.section.course + ' - ' + currTime.section.section,
                        startDateTime: this.getTime(currDay, currTime.start),
                        endDateTime: this.getTime(currDay, currTime.end),
                        classes: this.getColourForCourse(currTime.section.department, currTime.section.course)
                    }
                    currSchedule.items.push(item)
                }
            }
        }
        return schedules
    }

    getTime = (day, time) => {
        let daysToAdd = days.indexOf(day)
        return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + daysToAdd, time / 100, time % 100)
    }

    getItems = () => {
        if (!this.state || !this.state.schedules || this.state.schedules.length === 0 || this.state.selected === undefined || this.state.selected >= this.state.schedules.length) {
            return []
        }
        return this.state.schedules[this.state.selected].items
    }

    removeSchedules = () => {
        clearCourses()
        this.setState({ schedules: [], courses: [] })
    }

    getNewSchedules = async (course) => {

        //this course is fucked // { "department": "CIS", "course": "1300" }
        // { "department": "CIS", "course": "2750" }
        // { "department": "MATH", "course": "1030" }
        // { "department": "MATH", "course": "1160" }
        // { "department": "CIS", "course": "1910" }

        let schedules = this.state.schedules
        let newSchedules = await getAllSchedules(schedules, course)
        this.attachScheduleItems(newSchedules)

        let courses = this.state.courses
        courses.push(course)
        this.setState({ schedules: newSchedules, courses })
    }

    render() {
        console.log(this.state)
        return (
            <>
                {/* <div>
                    <input onChange={(e) => this.setState({ newCourse: e.target.value })}></input>
                    <button onClick={this.getNewSchedules}>SUBMIT</button>
                    <button onClick={this.removeSchedules}>CLEAR ALL SCHEDULES</button>
                    <input onChange={(e) => this.setState({ selectedInput: parseInt(e.target.value) })}></input>
                    <button onClick={() => this.setState({ selected: this.state.selectedInput })}>Change Schedule index</button>
                </div> */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div>
                            <AutoSuggest getNewSchedules={this.getNewSchedules} />
                        </div>

                        <div style={{ paddingTop: '20px', marginLeft: '10px' }}>
                            <Fab size='small' aria-label="delete">
                                <DeleteIcon onClick={this.removeSchedules} />
                            </Fab>
                        </div>
                    </div>
                </div>

                <div style={styles.scheduleWrapper}>
                    <div style={styles.thumbnails}>
                        {this.state.schedules && this.state.schedules.map((schedule, index) => {
                            return (
                                <div key={index}>
                                    <Thumbnail
                                        onClick={() => this.setState({ selected: index })}
                                        items={schedule.items}
                                        width={this.state.thumbnail.width}
                                        height={this.state.thumbnail.height}
                                        colours={colours} />
                                </div>
                            )
                        })}
                    </div>
                    <div style={styles.agenda}>
                        <ReactAgenda
                            // minDate={monday}
                            // maxDate={thursday}
                            startDate={monday}
                            cellHeight={8}
                            locale={"us"}
                            items={this.getItems()}
                            numberOfDays={5}
                            rowsPerHour={6}
                            itemColors={colours}
                            autoScale={false}
                            fixedHeader={true}
                            headFormat={"ddd"}
                            startAtTime={8}
                            endAtTime={22.9}
                        // onItemEdit={this.handleItemEdit.bind(this)}
                        // onCellSelect={this.handleCellSelection.bind(this)}
                        // onRangeSelection={this.handleRangeSelection.bind(this)}
                        />
                    </div>
                    <div style={styles.courseCards}>
                        {this.state.courses ? this.state.courses.map((course, index) => {
                            return <PaperSheet key={index} course={course} />
                        })
                            : <div>No Courses Selected</div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SchedulerDisplay)

const styles = {
    scheduleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: '10px'
    },
    agenda: {
        border: '1px solid black',
        flex: 4
    },
    thumbnails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    courseCards: {
        flex: 2
    }
}
