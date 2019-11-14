import axios from "axios";
const domain = process.env.REACT_APP_SMASHTRACK_DOMAIN;
const port = process.env.REACT_APP_SMASHTRACK_PORT;
const protocol = process.env.REACT_APP_SMASHTRACK_PROTOCOL;

export const smashtrack = axios.create({
  baseURL: `${protocol}://${domain}:${port}`,
  withCredentials: true,
  params: {
    page: 0,
    pageSize: 50
  }
});

let api = {
    login: async(tag, password) => {
      let loginAttempt = await smashtrack.post('/login', {
            tag,
            password
        });

        let success = loginAttempt && loginAttempt.data && loginAttempt.data.authenticated;

        if (success) {
          localStorage.setItem('smackbrack.user', JSON.stringify({ tag, id: loginAttempt.data.user.id }));
        }
        else {
          localStorage.removeItem('smackbrack.user');
        }

        return success;
    },
    logout: async () => {
      try {
        await smashtrack.post('/login/logout');
        localStorage.removeItem('smackbrack.user');
        return true;
      }
      catch (err) {
        return false;
      }
    },
    isLoggedIn: async () => {
        let isLoggedInResponse = await smashtrack.get('/login');
        let success = isLoggedInResponse && isLoggedInResponse.data && isLoggedInResponse.data.authenticated;

        if (!success) {
          localStorage.removeItem('smackbrack.user');
        }

        return success;
    },
    getBoard: async (id) => {
        let response = await smashtrack.get(`/boards/${id}`);
        return response.data;
    },

    createBoard: async (name, stages, users) => {
        let response = await smashtrack.post('/boards/add', {
            name: `smackbrack_${name}`,
            stages: stages,
            users: users
        });

        if (response.data.success) {
            return response.data.data[0];
        }

        return false;
    }
};

export default api;
