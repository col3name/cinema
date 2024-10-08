export const randomInt = (min: number , max: number): number =>  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function roundTo2(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
