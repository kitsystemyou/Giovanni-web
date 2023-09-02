import { useState }  from 'react';
import { TableRow, TableCell, Stack, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Image } from 'react-bootstrap';
import { useWindowSize } from 'src/hooks/useWindowSize';
import PropTypes from 'prop-types';

const TableContents = (props) => {
    const setdata = props.setdata;
    const handleTesxtUpdate = props.handleTesxtUpdate;

    const createdAt = setdata.created_at;
    const updatedAt = setdata.updated_at;
    // get window size
    const [width, height] = useWindowSize();
    const [editedText, setEditedText] = useState(setdata.text);

    const handleTextChange = (e) => {
      setdata.text = e.target.value;
      setEditedText(e.target.value);
    }

return (
      <TableRow
        hover
        key={setdata.id}
      >
        <TableCell key={setdata.id}>
          <Stack
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <Typography variant="subtitle2" align="center">
              {setdata.title}
            </Typography>
            <Image
              key={setdata.id}
              src={`https://storage.cloud.google.com/giovanni-storage/`+ encodeURI(setdata.path)}
              style={{width: width/4}}
            />
          </Stack>
        </TableCell>
        <TableCell
          width={width/4}>
          <TextField
            fullWidth
            fullheight="true"
            multiline={true}
            rows={20}
            value={editedText}
            variant="outlined"
            onChange={handleTextChange}
            contentEditable={true}
            suppressContentEditableWarning={true}
            width={100}
           >
          </TextField>
          <Button
            variant="contained"
            onClick={ () => handleTesxtUpdate(setdata.text, setdata.id, setdata.title)}
            >
            Update
          </Button>
        </TableCell>
        <TableCell>
          {createdAt ? createdAt.split(".")[0] : ""}
        </TableCell>
        <TableCell>
          {updatedAt ? updatedAt.split(".")[0] : ""}
        </TableCell>
      </TableRow>
    );
  };

export default TableContents;

TableContents.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  handleTextChange: PropTypes.func,
};
