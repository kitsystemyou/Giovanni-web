import axios from 'axios';

const collectionAPI = {
    async get_document(user_info) {
        const result = axios.get(`http://localhost:8000/collection/${user_info.user_id}/${user_info.group_id}`)
        return result
    }
}


export default collectionAPI;