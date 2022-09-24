import { memo } from 'preact/compat'

const FormatDate = ({ dateTime }) => {
    if (dateTime) {
        const date = new Date(dateTime * 1000)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return 'Not Specified'
}

const Location = ({ location, type }) => {
    if (type === 'ONLINE') {
        return (
            <a href={location} target="_blank" rel="noopener noreferrer">
                Click Here
            </a>
        )
    }

    return <span>{location}</span>
}

const TypeIcon = ({ type }) => {
    if (type === 'ONLINE') {
        return <i class="fa-solid fa-computer" />
    }

    return <i class="fa-solid fa-people-group" />
}

const MeetingItem = ({ name, type, location, dateTime }) => (
    <tr>
        <th scope="row text-start">{name}</th>
        <td>
            <FormatDate dateTime={dateTime} />
        </td>
        <td>
            <Location location={location} type={type} />
        </td>
        <td>
            <TypeIcon type={type} />
        </td>
    </tr>
)

export default memo(MeetingItem)
