export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const SERVER_URL = 'https://api.vtargete.pro/'