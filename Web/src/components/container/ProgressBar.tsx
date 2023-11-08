import { calculateTrueRatio } from "@/util/math"

export default function ProgressBar({
    progress,
}:{
    progress: Array<boolean>,
}) {
    const fraction = calculateTrueRatio(progress)
    return (
        <div className="h-[2rem]">
            <div className={`bg-blue-500 w-{${fraction}}`}>{fraction}</div>
        </div>
    )
}