import axios from 'axios';

const collectionAPI = {
    async get_document(user_info) {
        const result = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${user_info.user_id}/${user_info.group_id}`)
        return result
    },
    async update_document(user_info, text, set_id, name) {
        console.log("text: ", text, "set_id: ", set_id)
        const data = {
            text: text,
            set_id: set_id,
            name: name,
        }
        const result = axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${user_info.user_id}/${user_info.group_id}`,data)
        return result
    },
}

export default collectionAPI;