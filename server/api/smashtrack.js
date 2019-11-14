const axios = require('axios');
const { SMASHTRACK_PROTOCOL, SMASHTRACK_DOMAIN, SMASHTRACK_PORT, SMASHTRACK_API_USER, SMASHTRACK_API_PASSWORD } = process.env;

const smashTrack = axios.create({
    baseURL: `${SMASHTRACK_PROTOCOL}://${SMASHTRACK_DOMAIN}:${SMASHTRACK_PORT}`,
    withCredentials: true,
});

module.exports = {
    login: async () => {
        let isLoggedInResponse = await smashTrack.get('/login');
        if (isLoggedInResponse.data.authenticated) {
            return true;
        }

        console.log('logging in with', SMASHTRACK_API_USER, SMASHTRACK_API_PASSWORD);
        let loginAttempt = await smashTrack.post('/login', {
            tag: SMASHTRACK_API_USER,
            password: SMASHTRACK_API_PASSWORD
        });

        if (loginAttempt.data && loginAttempt.data.authenticated) {
            Object.assign(smashTrack.defaults, {headers: {Cookie: loginAttempt.headers["set-cookie"][0]}});
            console.log(loginAttempt.headers["set-cookie"]);
        }

        return loginAttempt.data.authenticated;
    },
    getBoard: async (id) => {
        let response = await smashTrack.get(`/boards/${id}`);
        if (response.data.count) {
            return response.data.data[0];
        }
        return null;
    },
    // createBoard: (data) => {
    //     return smashTrack.post('/boards/add', {
    //         name: data.name,
    //         stages: data.stages,
    //         users: data.users
    //     })
    // }
};