import React from 'react'
import { withRouter } from "react-router-dom"
import { getAllSchedules, getSchedulesFromCourses, getCourses, storeCourses, storeSort } from '../utils/scheduleHandler'
import { ReactAgenda } from 'react-agenda'
import Thumbnail from '../utils/Thumbnail'
import AutoSuggest from '../utils/AutoSuggest'
import PaperSheet from '../utils/CourseCards'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AgendaItem from '../utils/AgendaItem'
import { monday, paginationLength, thumbnailSize, colours } from '../utils/helpers'

// set localstorage to this value to get 300 schedules
//`[{"department":"CIS","course":"1300"},{"department":"MATH","course":"4150"},{"department":"CIS","course":"1500"},{"department":"FRHD","course":"3070"}]`

class SchedulerDisplay extends React.Component {


    constructor(props) {
        super(props)
        storeSort({ value: 'daysOff', descending: true })

        let selected = 0
        let courses = getCourses()
        this.state = {
            selected,
            courses,
            thumbnailStart: 0,
            schedules: []
        }
        getSchedulesFromCourses(courses).then(schedules => {
            this.attachScheduleItems(schedules)
            this.setState({ schedules })
        })
    }

    attachScheduleItems = (schedules, startIndex) => {
        startIndex = startIndex !== undefined ? startIndex : this.state.thumbnailStart
        for (let i = startIndex; i < schedules.length && i < startIndex + paginationLength; i++) {
            let currSchedule = schedules[i]
            currSchedule.generateItems()
        }
    }

    thumbnailsChangePage = (forwards) => {
        let newStartIndex = forwards ? this.state.thumbnailStart + paginationLength : this.state.thumbnailStart - paginationLength
        this.attachScheduleItems(this.state.schedules, newStartIndex)
        this.setState({ thumbnailStart: newStartIndex })
    }

    getItems = () => {
        return this.state.schedules.length > 0 && this.state.selected !== undefined ? this.state.schedules[this.state.selected].getItems() : []
    }

    removeSchedules = () => {
        // clear courses from localstorage
        storeCourses([])
        this.setState({ schedules: [], courses: [] })
    }

    getNewSchedules = async (course) => {
        let schedules = this.state.schedules
        let newSchedules = await getAllSchedules(schedules, course, { sort: 'leastSpaceBetween' })
        this.state.courses.push(course)
        this.attachScheduleItems(newSchedules)
        this.setState({ schedules: newSchedules })
    }

    onDeleteCourse = async (index) => {
        let courses = this.state.courses
        courses.splice(index, 1)
        storeCourses(courses)
        let schedules = await getSchedulesFromCourses(courses)
        this.attachScheduleItems(schedules)
        this.setState({ courses, schedules })
    }

    render() {
        console.log(this.state)
        return (
            <>


                <div style={styles.scheduleWrapper}>
                    <div style={styles.thumbnails}>
                        {(this.state.selected + 1) + '/' + this.state.schedules.length}
                        <div>
                            <button
                                onClick={() => this.thumbnailsChangePage(false)}
                                disabled={this.state.thumbnailStart < paginationLength} >
                                {'<'}
                            </button>
                            <button
                                onClick={() => this.thumbnailsChangePage(true)}
                                disabled={this.state.thumbnailStart + paginationLength >= this.state.schedules.length} >
                                {'>'}
                            </button>
                        </div>
                        {this.state.schedules.map((schedule, index) => {
                            if (index >= this.state.thumbnailStart && index < this.state.thumbnailStart + paginationLength) {
                                return (
                                    <div key={index}>
                                        <Thumbnail
                                            onClick={() => this.setState({ selected: index })}
                                            items={schedule.getItems()}
                                            width={thumbnailSize.width}
                                            height={thumbnailSize.height} />
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div style={styles.agenda}>
                        <ReactAgenda
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
                            endAtTime={21.9}
                            itemComponent={AgendaItem}
                            onRangeSelection={() => { }} />
                    </div>
                    <div style={styles.courseCards}>
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
                        <div>
                            {this.state.courses && this.state.courses.length > 0 ? this.state.courses.map((course, index) => {
                                return <PaperSheet onDelete={() => this.onDeleteCourse(index)} key={index} course={course} />
                            })
                                : <div>No Courses Selected</div>
                            }
                        </div>
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
        flex: 6
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
