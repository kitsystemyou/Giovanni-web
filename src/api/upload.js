import axios from 'axios';

const uploadAPI = {
    async uplaod(file) {
        const result = axios.post('http://localhost:8000/upload',file,
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