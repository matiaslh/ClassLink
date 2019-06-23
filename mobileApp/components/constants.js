
const constants = {
    departments: [
        { 'any': 'Any' },
        { 'CIS': 'Computer Science' },
        { 'ENGG': 'Engineering' }
    ],
    levels: [
        { 'any': 'Any' },
        { '100': 'First Year' },
        { '200': 'Second Year' }
    ]
}

export default constants

export const labels = {
    departments: constants.departments.reduce((result, item, index) => {
        let value = Object.keys(item)[0]
        result[value] = item[value]
        return result
    }, {}),
    levels: constants.levels.reduce((result, item, index) => {
        let value = Object.keys(item)[0]
        result[value] = item[value]
        return result
    }, {})
}