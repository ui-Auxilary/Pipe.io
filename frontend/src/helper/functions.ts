import axios from 'axios';

export default async function getUser() {
    return await axios.post('http://localhost:8000/users/get_user', {}, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        }
    }).then((res) => res.data)
}