import React from 'react'

const Loading = ({gridClass}) => {
    return (
    <ul className={`loader ${gridClass}`}>
        {
            [...Array(20).keys()].map(n => {
                return (
                    <li key={n} className="aspect-[1/1.5] bg-slate-200 rounded-md animate-pulse"></li>
                )
            })
        }
    </ul>
    )
}

export default Loading