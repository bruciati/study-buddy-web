import { memo } from 'preact/compat'

const MemberItem = memo(({ isOwner, firstName, lastName }) => {
    const fullName = firstName + (lastName ? ` ${lastName}` : '')

    return (
        <div class="col mb-2">
            <div class="card p-2 text-center bg-secondary">
                <div class="fs-5 text-white">
                    {isOwner && <i class="fa-solid fa-crown me-2 text-alert" />} {fullName}
                </div>
            </div>
        </div>
    )
})

const MembersList = ({ ownerId, members }) => (
    <div class="mb-4">
        <h3>
            <i class="fa-solid fa-user-group me-2" />
            Participants
        </h3>
        <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {members.map(({ id, firstName, lastName }) => (
                <MemberItem
                    key={id}
                    isOwner={ownerId === id}
                    firstName={firstName}
                    lastName={lastName}
                />
            ))}
        </div>
    </div>
)

export default MembersList
