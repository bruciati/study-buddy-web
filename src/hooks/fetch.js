import { useState } from 'preact/hooks'

const useFetchFunction = (parseJson = true) => {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const doFetch = ({ url, ...opts }) => {
        setResponse(null)
        setLoading(true)
        setError(null)

        fetch(url, opts)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }

                return parseJson ? response.json() : response.text()
            })
            .then((response) => response && setResponse(response))
            .catch(setError)
            .finally(() => setLoading(false))
    }

    return [response, error, loading, doFetch]
}

export default useFetchFunction
