import React from 'react'
import { withRouter } from "react-router-dom"

// map a number in one range to another range
const mapToRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const START_HOUR = 800
const END_HOUR = 2300

class Thumbnail extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')

        let height = canvas.clientHeight
        let width = canvas.clientWidth

        let cols = 5
        let colWidth = width / cols
        let rows = 14
        let rowHeight = height / rows

        // make column lines
        for (let i = 0; i < cols; i++) {
            ctx.beginPath()
            ctx.moveTo(i * colWidth, 0)
            ctx.lineTo(i * colWidth, height)
            ctx.stroke()
        }

        // make row lines
        for (let i = 0; i < rows; i++) {
            ctx.beginPath()
            ctx.moveTo(0, i * rowHeight)
            ctx.lineTo(width, i * rowHeight)
            ctx.stroke()
        }

        let items = this.props.items
        for (let i = 0; i < items.length; i++) {
            let currItem = items[i]
            let col = currItem.startDateTime.getDay() - 1
            let rowStart = currItem.startDateTime.getHours() * 100 + currItem.startDateTime.getMinutes()
            let rowEnd = currItem.endDateTime.getHours() * 100 + currItem.endDateTime.getMinutes()

            ctx.fillStyle = this.props.colours[currItem.classes]
            let rect = {
                x: col * colWidth + 1,
                y: mapToRange(rowStart, START_HOUR, END_HOUR, 0, height),
                width: colWidth - 2,
                height: mapToRange(rowEnd - rowStart, 0, END_HOUR - START_HOUR, 0, height)
            }
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height)

        }
    }

    render() {
        return (
            <div style={styles.container}>
                <canvas onClick={this.props.onClick} style={styles.canvas} ref="canvas" width={this.props.width} height={this.props.height} />
            </div>
        )
    }
}

export default withRouter(Thumbnail)

const styles = {
    container: {
    },
    canvas: {
        border: '1px solid black'
    }
}