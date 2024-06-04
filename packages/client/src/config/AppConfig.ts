// const apiUrl = import.meta.env.VITE_API_URL;
const appConfig = {
    apiUrl: import.meta.env.VITE_API_URL, //process.env.VITE_API_URL,
};

console.log('Loaded API URL:', appConfig.apiUrl);

export default appConfig;
