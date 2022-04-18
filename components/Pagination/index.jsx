import React, {useState, useRef} from 'react'

const Pagination = ({handlePaginate, handleJumpToPage,  page, data}) => {
    const inputNumberRef = useRef(null)
    const {total_pages} = data
    const [inputValue, setInputValue] = useState(page)

    const handleInputChange = e => {
        const value = e.target.value

        if (value < 0) return

        setInputValue(value)
    }

    const handleKeyPress = e => {
        const value = Number(e.target.value)
        const key = e.which

        if (value > total_pages || value === 0) return

        if (key === 13) {
            handleJumpToPage(value)
        }
    }

    const handleBlurInput = () => {
        inputNumberRef.current.value = page
    }

    return (
    <div className="py-8 flex justify-between items-center">

        <button 
            onClick={() => handlePaginate('prev')} 
            className={`${page===1? 'opacity-0' : 'opacity-1'} bg-cyan-500 text-white font-semibold text-sm py-2 px-5 rounded-md`}
            disabled={page===1? true : false}
        >
            PREV
        </button>

        <div className="jumptopage h-full flex gap-2 items-center">
            <span className="text-sm font-semibold text-black/60">Page</span>
            <input 
                ref={inputNumberRef}
                type="number"
                min="1" 
                max={total_pages}
                value={inputValue}
                onChange={e => handleInputChange(e)}
                onKeyDown={e => handleKeyPress(e)}
                onBlur={() => handleBlurInput()}
                className={`${inputValue > total_pages? 'focus:ring-2 focus:ring-red-300' : 'focus:ring-2 focus:ring-cyan-300'}  text-center bg-cyan-100 outline-0 w-[50px] px-2 py-1 rounded-sm`}
            />
            <span className="text-sm font-semibold text-black/60">of {total_pages}</span>
        </div>

        <button
            onClick={() => handlePaginate('next')} 
            className={`${page===total_pages? 'opacity-0' : 'opacity-1'} bg-cyan-500 text-white font-semibold text-sm py-2 px-5 rounded-md`}
            disabled={page===total_pages? true : false}
        >
            NEXT
        </button>

        <style jsx>{`
            
            /* Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }

            /* Firefox */
            input[type=number] {
            -moz-appearance: textfield;
            }
            
            `}</style>

    </div> 
    )
}

export default Pagination