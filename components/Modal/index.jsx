import React, {useEffect} from 'react'
import {useModalState} from '../../store/useStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
function Modal({id}) {
    const toggleModalShow = useModalState(state => state.toggleModalShow)

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <div className="modal fixed inset-0 h-screen w-full bg-black/60 backdrop-blur-md z-[100]">
            <div onClick={toggleModalShow} className="absolute top-5 right-6 h-[1.2rem] cursor-pointer">
                <FontAwesomeIcon icon={faClose} height="100%" color="white" />
            </div>
            <div className="w-full flex justify-center items-center h-full">
                <div className="video aspect-video w-[98%] md:w-[85%] lg:w-[70%] rounded-md overflow-hidden">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                        
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Modal