import React from 'react'
import './ErrorStatus.css'

interface ErrorStatusProps {
    error?: Error
}

export const ErrorStatus = (props: ErrorStatusProps) => {
    return props.error ? (
        <p className="ErrorStatus">{props.error?.message || 'Something went wrong '}</p>
    ) : null
}
