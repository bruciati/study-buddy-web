import MeetingItem from './meetingitem'

const MeetingsTable = ({ meetings }) => {
    if (meetings.length > 0) {
        return (
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Online / In person</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map(({ name, type, location, dateTime }, idx) => (
                        <MeetingItem
                            key={idx}
                            name={name}
                            type={type}
                            location={location}
                            dateTime={dateTime}
                        />
                    ))}
                </tbody>
            </table>
        )
    }

    return <span class="fs-5">This group has no active meetings</span>
}

export default MeetingsTable
