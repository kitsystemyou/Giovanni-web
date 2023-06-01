import React from 'react';
import { useState } from 'react';
import uploadAPI from './api/upload';

function App() {
 const [title,setTitle] = useState();
 const [image,setImage] = useState();

 const handleSubmit = () => {
  console.log(image);
  const form_data = new FormData()
  // file.append("title",title);
  form_data.append("file", image[0], image[0].name);

  uploadAPI.uplaod(form_data).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
   return (
     <>
      <p>ファイル送信</p>
       <input type="text" placeholder="写真のタイトル"
        onChange={event => setTitle(event.target.value)} />

      <input accept="image/*" multiple type="file"
        onChange={event => setImage(event.target.files)} />
        {title}
      <button onClick={handleSubmit}>送信</button>
      </>
    );
}

export default App;
