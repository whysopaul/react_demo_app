export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const URL = window.location.href.includes('localhost') ? 'http://localhost:8080' : 'https://react-demo-app-85af0.web.app'
export const SERVER_URL = 'https://api.vtargete.pro/'