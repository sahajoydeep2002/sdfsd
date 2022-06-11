import jwt_decode from 'jwt-decode';
import axios from 'axios';

async function getName() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        const id = decoded._id;

        const res = await axios.get(`/api/users/${id}`);
        console.log(res.data.name);
        return res.data.name;
    } else {
        return null;
    }
}

export default getName;
