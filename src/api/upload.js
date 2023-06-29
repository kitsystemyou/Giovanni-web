import axios from 'axios';

const uploadAPI = {
    async uplaod(file, user_info) {
        const result = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${user_info.user_id}/${user_info.group_id}`,file,
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