import apiKeysConfig from '../config/rentCastConfig';

export const rentCastDetailsMap: { [key: number]: string } = {
    1: apiKeysConfig.rentCastApiKey,
    2: apiKeysConfig.backUpRentCastApiKey,
    3: apiKeysConfig.backUpbackUpRentCastApiKey,
};

export enum DatabaseTriggerType {
    GET_ALL_LISTINGS = 'GET_ALL_LISTINGS',
    INSERT = 'INSERT',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
};