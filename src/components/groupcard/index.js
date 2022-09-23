import { memo } from 'preact/compat'
import { Link } from 'preact-router/match'

import style from './style.scss'

const getAoiSrc = (aoi) => {
    const fileName = aoi.replace(' ', '_').toLowerCase()
    return `/assets/img/aoi/${fileName}.jpg`
}

const GroupCard = ({ id, title, areaOfInterest, description, owner, members }) => {
    const aoiSrc = getAoiSrc(areaOfInterest)
    const ownerName = owner.firstName + (owner.lastName ? ` ${owner.lastName}` : '')

    return (
        <div class="col-12 px-4 col-md-6 px-md-2 col-lg-3 my-3">
            <div class="card shadow overflow-hidden h-100">
                <div class={`card-img-top ${style.imgback}`}>
                    <h2 class={`text-center text-white text-truncate ${style.imgtext}`}>{areaOfInterest}</h2>
                    <img class={`w-100 ${style.img}`} src={aoiSrc} alt="Area of interest" />
                </div>
                <div class="card-body">
                    <h3 class="card-title">{title}</h3>
                    <h5 class="card-subtitle">
                        Owner: <span class="text-muted">{ownerName}</span>
                    </h5>
                    <h5 class="card-subtitle mt-2">
                        Participants: <span class="text-muted">{members.length}</span>
                    </h5>
                    <p class={`card-text text-break mt-2 ${style.textclamp}`}>{description}</p>
                </div>
                <div class="card-footer bg-white border-0 pt-0 pb-3">
                    <div class="row">
                        <div class="col">
                            <a class="btn btn-outline-primary w-100 fw-bold" href="javascript:void(0)">
                                JOIN
                            </a>
                        </div>
                        <div class="col">
                            <Link class="btn btn-outline-primary w-100 fw-bold" href={`/group/${id}`}>
                                SEE MORE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(GroupCard)
