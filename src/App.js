import React, { useEffect } from 'react';
import { useState } from 'react';
import uploadAPI from './api/upload';
import collectionAPI from './api/collection';
import Button from '@mui/material/Button';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MuiFileInput } from 'mui-file-input';

function App() {
  const [title,setTitle] = useState("");
  const [image,setImage] = useState();
  const [list_document,setList_document] = useState({});

  const user_info = {
  user_id: "user_id",
  group_id: "41e50a1f-6f7f-979f-fcda-52591934bde1",
  }
  useEffect(() => {
    collectionAPI.get_document(user_info).then(res => {
      console.log(res.data);
      setList_document(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[])

  const handleSubmit = () => {
  console.log(image);
  const form_data = new FormData()
  if (image !== undefined) {
    form_data.append("file", image, image.name);

  uploadAPI.uplaod(form_data, user_info).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  setImage(image[0])
  }
   return (
     <div className="App">
      <h1>Giovanni</h1>
      <h2>～ジ〇バンニが一晩でやってくれました～</h2>
      <p>※本アプリでは一晩もかかりません数分です</p>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField id="outlined-basic" label="写真のタイトル" variant="outlined"
         onChange={event => setTitle(event.target.value)}/>
      </Box>
        {title}
        <br />
      <MuiFileInput value={image} onChange={e => setImage(e)} variant="outlined" accept="image/*" size="small"/>
      <Button variant="contained" onClick={handleSubmit}>送信</Button>
      <br />
      {JSON.stringify(list_document)}
      </div>
    );
}

export default App;
