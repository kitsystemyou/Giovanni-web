import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { Image } from 'react-bootstrap';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  console.log("items", items)

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Texts
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Updated At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((setdata) => {
                const isSelected = selected.includes(setdata.id);
                // const createdAt = format(customer.created_at, 'dd/MM/yyyy');
                const createdAt = setdata.created_at;
                const updatedAt = setdata.updated_at;
                return (
                  <TableRow
                    hover
                    key={setdata.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(setdata.id);
                          } else {
                            onDeselectOne?.(setdata.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="column"
                        spacing={2}
                      >
                        {/* <Card>
                        <CardMedia
                          src={`https://storage.cloud.google.com/giovanni-storage/`+ encodeURI(setdata.path)+`?authuser=2`}
                          title={setdata.title}
                          sx={{ height: 100, width: 100 }}
                        >
                        </CardMedia>
                        </Card> */}
                        <Typography variant="subtitle2" align="center">
                          {setdata.title}
                        </Typography>
                        <Image
                          src={`https://storage.cloud.google.com/giovanni-storage/`+ encodeURI(setdata.path)+`?authuser=2`}
                          style={{width: 100}}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {setdata.text}
                    </TableCell>
                    <TableCell>
                      {createdAt ? createdAt.split(".")[0] : ""}
                    </TableCell>
                    <TableCell>
                      {updatedAt ? updatedAt.split(".")[0] : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
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
  selected: PropTypes.array
};
