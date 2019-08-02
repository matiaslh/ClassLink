
// constants
export const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']
export const monday = new Date('07/22/2019')
export const paginationLength = 6
export const thumbnailSize = {
    width: 150,
    height: 100
}

export const colours = {
    "colour-0": "rgba(242, 177, 52, 1)",
    'colour-1': "rgba(102, 195, 131 , 1)",
    "colour-2": "rgba(242, 177, 255, 1)",
    "colour-3": "rgba(235, 85, 59, 1)"
}

// map a number in one range to another range
export const mapToRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;