import { memo } from 'preact/compat'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TypeIcon = ({ type }) => {
    if (type == 'ONLINE') {
        return <i class="fa-solid fa-computer" />
    }

    return <i class="fa-solid fa-people-group" />
}

const FormatDate = ({ dateTime }) => {
    if (dateTime) {
        const date = new Date(dateTime * 1000)
        return `${date.getDay()} ${months[date.getMonth()]} at ${date.getHours()}:${date.getMinutes()}`
    }

    return 'Not Specified'
}

const MeetingItem = ({ name, type, location, dateTime }) => (
    <tr>
        <th scope="row text-start">{name}</th>
        <td>
            <FormatDate dateTime={dateTime} />
        </td>
        <td>{location}</td>
        <td>
            <TypeIcon type={type} />
        </td>
    </tr>
)

export default memo(MeetingItem)
