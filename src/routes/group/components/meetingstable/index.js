import MeetingItem from './meetingitem'

const MeetingsTable = ({ meetings }) => {
    let table = <span class="fs-5">This group has no active meetings</span>

    if (meetings.length > 0) {
        table = (
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
                    {meetings.map((meeting, idx) => (
                        <MeetingItem key={idx} {...meeting} />
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <h3 class="my-3">
                <i class="fa-solid fa-handshake me-2" />
                Meetings
            </h3>
            <div class="table-responsive">{table}</div>
        </>
    )
}

export default MeetingsTable
