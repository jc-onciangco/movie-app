import { CircularProgressbar } from 'react-circular-progressbar';
const ProgressCircle = ({value}) => {
    return (
    <div className="relative h-[2.5rem] lg:h-[2.75rem] aspect-square bg-cyan-900 rounded-full p-[0.2rem]">
        <div className="value absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-extrabold font-sans text-xs">{value*10}<sup className="text-[0.5rem]">%</sup></div>
        <CircularProgressbar 
            strokeWidth={6} 
            value={value*10}
            styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `#0FBFDC`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'round',
                  // Customize transition animation
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  // Rotate the path
                  transformOrigin: 'center center',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: 'rgba(15, 191, 220, 0.4)',
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
                  // Rotate the trail
                  transform: 'rotate(0.25turn)',
                  transformOrigin: 'center center',
                }
              }} />
    </div>
    )
}

export default ProgressCircle