const axios = require('axios');
const { SMASHTRACK_PROTOCOL, SMASHTRACK_DOMAIN, SMASHTRACK_PORT, SMASHTRACK_API_USER, SMASHTRACK_API_PASSWORD } = process.env;

const smashTrack = axios.create({
    baseURL: `${SMASHTRACK_PROTOCOL}://${SMASHTRACK_DOMAIN}:${SMASHTRACK_PORT}`,
});

module.exports = {
    login: async () => {
        let isLoggedInResponse = await smashTrack.get('/login');
        if (isLoggedInResponse.data.authenticated) {
            return true;
        }

        let loginAttempt = await smashTrack.post('/login', {
            tag: SMASHTRACK_API_USER,
            password: SMASHTRACK_API_PASSWORD
        });

        return loginAttempt.data.authenticated;
    },
    getBoard: async (id) => {
        let response = await smashTrack.get(`/boards/${id}`);
        return response.data;
    },
    // createBoard: (data) => {
    //     return smashTrack.post('/boards/add', {
    //         name: data.name,
    //         stages: data.stages,
    //         users: data.users
    //     })
    // }
};