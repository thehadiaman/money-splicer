export function generateRandomNumber(digits: number=5): number{
    let power = 10**(digits-1);
    return Math.floor(power + Math.random() * 9*power);
}


