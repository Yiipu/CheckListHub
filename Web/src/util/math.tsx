/**
 * 用于计算 ProgressBar 中的 tailwind css 
 * @param progress 一个布尔数组
 * @returns 布尔数组中 true 的比例，用分数表示
 */
function calculateTrueRatio(progress: Array<boolean>):number {
    // 使用reduce函数计算为true的元素个数
    const trueCount = progress.reduce((count, value) => count + (value ? 1 : 0), 0)
    const total = progress.length

    const ratio = (trueCount/total)*100

    // 返回分数表示的结果
    return keepTwoDecimalWithReg(ratio)
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

function keepTwoDecimalWithReg(num: number){
    return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
  };

export {calculateTrueRatio}