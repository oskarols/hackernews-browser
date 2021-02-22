import React from 'react'
import formatRelative from 'date-fns/formatRelative'

interface DateTimeProps {
    // Unix timestamp
    timestamp: number
}

/**
 * Shows timestamp in readable form
 */
export const RelativeTime = (props: DateTimeProps) => {
    const date = new Date(props.timestamp * 1000)
    const timeago = formatRelative(date, Date.now())
    return <time>{timeago}</time>
}
