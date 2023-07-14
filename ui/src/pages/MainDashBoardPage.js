import React, { useState, useEffect, useContext } from 'react'
import { Text, Heading, Button, TableContainer, Box, Th, Tr, Table, TableCaption, Td, Tfoot, Thead, Tbody, } from '@chakra-ui/react';
import axios from '../functions/axios';
import { Navigate } from 'react-router-dom';
import userContext from '../functions/userContext';
import generateReport from '../functions/generateReport';

function MainDashBoardPage({ data }) {
  const user = useContext(userContext);
  const [dataList, setDataList] = useState([]);
  let sn = 0;

  const [motorcycles, setMotorcycles] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [requestLogout, setRequestLogout] = useState(false);
  const logOut = async () => {
    let logoutURL = "http://127.0.0.1:8000/accounts/logout";
    axios.post(logoutURL, {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data['message']);
        // setRespMessage(response.json())
      })
      .catch(error => {
        console.log(error)
        setRequestLogout(false)
      })
  }
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/reporting/detected/')
      .then(response => {
        setDataList(response.data);
        console.log(dataList);
        setIsFetched(true)
        setMotorcycles(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (requestLogout) {
      user = null;
      logOut();
    }
  }, []);
  function getSerial() {
    sn = sn + 1;
    return sn;
  }

  return (<>

    <TableContainer maxW={'4xl'}>
      <Table variant='simple' className='table-tiny'>

        <Thead borderBottomWidth={2} borderBottomColor={'blackAlpha.700'}>
          <Tr >
            <Th>Index</Th><Th>Description</Th> <Th isNumeric>Detected Image</Th><Th>Reported Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataList.map(data => (<Tr>
            <Td key={data.id}>{data.id}</Td><Td>{data.description}</Td><Td>{data.image_url}</Td><Td>{data.inspected_url}</Td></Tr>))}
        </Tbody>
      </Table>
    </TableContainer>
    <Box m={5}>
      <Button color='blue.400' variant={'outline'} borderColor={'blue.400'} onClick={() => generateReport(dataList)}>Generate PDF Reports Summary</Button>
    </Box>
  </>)
}

export default MainDashBoardPage;