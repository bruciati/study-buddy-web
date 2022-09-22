import { SERVER_BASEURL } from '../constants'

const headers = { 'content-type': 'application/json' }

const parseJsonResponse = async (response) => {
    if (!response.ok) {
        throw Error(response.statusText)
    }

    const json = await response.json()
    if (!json.ok) {
        throw Error(json.error)
    }

    return json.data
}

export const fetchRegistration = async ({ password, ...body }) => {
    const response = await fetch(`${SERVER_BASEURL}/auth`, {
        method: 'PUT',
        headers: headers,
        cache: 'no-cache',
        body: JSON.stringify({
            ...body,
            authType: 'PASSWORD',
            authValue: password,
        }),
    })

    return await parseJsonResponse(response)
}

export const fetchLogin = async (body) => {
    const response = await fetch(`${SERVER_BASEURL}/auth`, {
        method: 'POST',
        headers: headers,
        cache: 'no-cache',
        body: JSON.stringify(body),
    })

    return await parseJsonResponse(response)
}

export const fetchRefreshToken = async (refreshToken) => {
    const response = await fetch(`${SERVER_BASEURL}/auth/refresh`, {
        method: 'POST',
        cache: 'no-cache',
        body: refreshToken,
    })

    return await parseJsonResponse(response)
}
