const baseUrl = () => {
    switch (process.env.NODE_ENV) {
        case "development": return ''; //  'http://localhost:5101';
        default: return 'https://reports.spid.center'
    }
}

export default baseUrl;