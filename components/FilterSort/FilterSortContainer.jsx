import React from 'react'

const FilterSortContainer = ({children, title}) => {
    return (
    <div className="sort bg-white shadow-lg rounded-b-md">
        <div className="label px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-t-md">{title}</div>
        <div className="input px-4 py-6 border-b-2 border-x-2 border-slate-100">
            {children}
        </div>
    </div>
    )
}

export default FilterSortContainer