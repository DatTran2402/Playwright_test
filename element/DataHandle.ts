export default class DataHandle {
    async getDataFormFileToArray(file: string): Promise<Array<string>> {
        const fs = require('fs');
        const content = fs.readFileSync('../Playwright_test/data/'+ file +'', 'utf-8');
        const arr = content.split('\r\n');
        return arr;
    }
}