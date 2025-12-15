export class UtilService {
    constructor() { }

    /** 
     *  Generates the random carrum id in range (AAAA0001 - ZZZZ9999)
     * */
    async generateCarrumId(): Promise<string> {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const letter = letters[Math.floor(Math.random() * letters.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        return `${letter}${letter}${letter}${letter}${number}${number}${number}${number}`;
    }
}