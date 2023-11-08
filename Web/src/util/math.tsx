/**
 * 用于计算 ProgressBar 中的 tailwind css 
 * @param progress 一个布尔数组
 * @returns 布尔数组中 true 的比例，用分数表示
 */
function calculateTrueRatio(progress: Array<boolean>):string {
    // 使用reduce函数计算为true的元素个数
    const trueCount = progress.reduce((count, value) => count + (value ? 1 : 0), 0)
    const total = progress.length

    // 使用最大公约数函数来简化分数
    const divisor = gcd(trueCount, total)
    const numerator = trueCount / divisor
    const denominator = total / divisor

    // 返回分数表示的结果
    return `${numerator}/${denominator}`
}

/**
 * 
 * @param a 
 * @param b 
 * @returns a 和 b 的最大公约数
 */
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
}

export {calculateTrueRatio}