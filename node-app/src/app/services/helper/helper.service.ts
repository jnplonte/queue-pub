import {    toJson, toString, isEmail, isEmpty, isNotEmpty, cleanData, isEmptyObject, isStringExist,
            createSecretKey, readSecretKey, checkObjectInList, replaceHtml,
            generateRandomString, flatObject, readJwtToken, createJwtToken, isInteger, isInArray,
            cleanDataWithNull, titleCase, cleanDataRemoveNull, groupBy
        } from 'jnpl-helper';

export class Helper {
    env: string = process.env.NODE_ENV || 'local';

    constructor(private config) {

    }

    toJson(jsonData: any = ''): any {
        return toJson(jsonData);
    }

    toString(jsonData: any = ''): any {
        return toString(jsonData);
    }

    cleanData(data: any = ''): any {
        return cleanData(data);
    }

    cleanDataWithNull(data: any = ''): any {
        return cleanDataWithNull(data);
    }

    cleanDataRemoveNull(data: any = ''): any {
        return cleanDataRemoveNull(data);
    }

    isEmptyObject(obj: Object = {}): boolean {
        return isEmptyObject(obj);
    }

    stringExist(string: string = '', character: string = ''): boolean {
        return isStringExist(string, character);
    }

    isNotEmpty(v: any = null): boolean {
        return isNotEmpty(v);
    }

    groupBy(arr: Array<any> = [], key: string = 'id') {
        return groupBy(arr, key);
    }

    isEmpty(v: any = null): boolean {
        return isEmpty(v);
    }

    isEmail(email: string = ''): boolean {
        return isEmail(email);
    }

    validateData(obj: Object = {}, list: Array<any> = []): boolean {
        return checkObjectInList(obj, list);
    }

    createSecretKey(secretHash: string = '', userId: string= '', companyId: string = ''): string {
        return createSecretKey(secretHash, userId, companyId);
    }

    readSecretKey(secretKey: string = '', test?): Object {
        return readSecretKey(this.config.secretKeyHash, secretKey, test);
    }

    replaceHtml(html: string = '', data: Object = {}): string {
        return replaceHtml(html, data);
    }

    generateRandomString(num: number = 10): string {
        return generateRandomString(num);
    }

    createJwtToken(userInformation: Object = {}, hasExpiration: boolean = true): string {
        return createJwtToken(this.config.secretKeyHash, userInformation, hasExpiration, this.config.secretKeyLength);
    }

    readJwtToken(jwtToken: string = ''): Object {
        return readJwtToken(this.config.secretKeyHash, jwtToken);
    }

    flatObject(obj: Object = {}, result: Object = {}): Object {
        return flatObject(obj, result);
    }

    isInteger(num: number = 0): boolean {
        return isInteger(num);
    }

    isInArray(value: any = '', array: Array<any> = []): boolean {
        return isInArray(value, array);
    }

    titleCase(string: string = ''): string {
        return titleCase(string);
    }

    get passwordExpiry(): Date {
        const dateExpiry = new Date();
        dateExpiry.setDate(dateExpiry.getDate() + this.config.passwordExpiryLength || 30);

        return dateExpiry;
    }

    get secretKey(): string {
        return this.config.secretKey || '';
    }

    get secretHash(): string {
        return this.config.secretKeyHash || '';
    }

    encode(data): string {
        return Buffer.from(data).toString('base64');
    }

    decode(data): string {
        return Buffer.from(data, 'base64').toString('ascii');
    }
}
