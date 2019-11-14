import axios from "axios";
const domain = process.env.REACT_APP_DOMAIN;
const port = process.env.REACT_APP_PORT;
const protocol = process.env.REACT_APP_PROTOCOL;

export const smackbrack = axios.create({
  baseURL: `${protocol}://${domain}:${port}`,
  withCredentials: true
});

let api = {
    createTournament: async (boardId, data) => {
        let response = await smackbrack.post('/tournament', {
            boardId,
            name: `smackbrack_${data.name}`,
            type: data.type
        });

        return response.data;
    }
};

export default api;