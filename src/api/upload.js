import axios from 'axios';

const uploadAPI = {
    async uplaod(file, user_info) {
        const result = axios.post(`http://localhost:8000/upload/${user_info.user_id}/${user_info.group_id}`,file,
        {
          headers: {
          'content-type': 'multipart/form-data',
          },
        }
      );
      return result
    },
}

export default uploadAPI;