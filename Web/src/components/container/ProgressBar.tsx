import { calculateTrueRatio } from "@/util/math"

export default function ProgressBar({
    progress,
}:{
    progress: Array<boolean>,
}) {
    const fraction = calculateTrueRatio(progress)
    return (
        <div className="h-[2rem] mx-2 flex border-2 border-sky-500">
            <div className={`bg-sky-500 h-full text-center leading-[2rem]`} style={{width:`${fraction}%`}}>{fraction} %</div>
            <div></div>
        </div>
    )
}