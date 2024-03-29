import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { MuiFileInput } from 'mui-file-input';
import uploadAPI from 'src/api/upload';
import collectionAPI from 'src/api/collection';
import { initUser } from 'src/contexts/auth-context';
import { useAuth } from 'src/hooks/use-auth';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [image,setImage] = useState(null);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const auth = useAuth();
  // const [list_document,setList_document] = useState({});
  const [sets, setSets] = useState([data]);

  if (!auth.user) {
    auth.user = initUser
  }
  const user_info = {
    user_id: auth.user.id,
    group_id: "default",
  }

  useEffect(() => {
    collectionAPI.get_document(user_info).then(res => {
      console.log(res.data);
      setSets(res.data.result);
    }).catch(err => {
      console.log(err);
    })

    const interval = setInterval(() => {
      collectionAPI.get_document(user_info).then(res => {
        console.log(res.data);
        setSets(res.data.result);
      }).catch(err => {
        console.log(err);
      })
    }, 10000);
    return () => clearInterval(interval);
  },[])

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSubmit = () => {
    const form_data = new FormData()
    // ファイル選択されていなければアラートだけ出す
    if (image !== undefined && image !== null) {
      form_data.append("file", image, image.name);
      uploadAPI.uplaod(form_data, user_info).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
        setImage(image[0])
        return
    }
    alert("select upload file")
  }

  const handleTesxtUpdate = (text, set_id, name) => {
    console.log(text, set_id, name)
    collectionAPI.update_document(user_info, text, set_id, name).then(res => {
      console.log(res.data);
    }
  )}

  return (
    <>
      <Head>
        <title>
          Giovanni | Image and Text
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Image and Text
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <MuiFileInput
                    placeholder="select file"
                    value={image}
                    onChange={e => setImage(e)}
                    variant="outlined"
                    accept="image/*"
                    // size="small"
                    />
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                    onClick={handleSubmit}
                  >
                     Upload
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            {/* <CustomersSearch /> */}
            <CustomersTable
              count={data.length}
              items={sets}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              handleTesxtUpdate={handleTesxtUpdate}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
