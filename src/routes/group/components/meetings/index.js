import MeetingsTable from './meetingstable'

const Meetings = ({ meetings, showModal }) => (
    <div>
        <div class="d-flex flex-row align-items-center">
            <h3 class="me-auto">
                <i class="fa-solid fa-handshake me-2" />
                Meetings
            </h3>
            <button type="button" class="btn btn-primary btn-sm" onClick={showModal}>
                <i class="fa-solid fa-sharp fa-plus" />
            </button>
        </div>
        <div class="table-responsive">
            <MeetingsTable meetings={meetings} />
        </div>
    </div>
)

export default Meetings
