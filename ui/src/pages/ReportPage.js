import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Tag, HStack, Center } from '@chakra-ui/react'
import axios from '../functions/axios'
function ReportPage() {
  const [dataList, setDataList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/reporting/incidents/')
      //     .then(response => {
      //         setDataList(response.data);
      //         console.log(dataList);
      //         setIsFetched(true)
      //         setMotorcycles(response.data)
      //     })
      //     .catch(error => {
      //         console.error(error);
      //     });
      // async function getData() {
      //     const res = await fetch(`http://127.0.0.1:8000/api/reporting/report`)
      //     const data = await res.json();
      //     setDataList(data)
      //     setIsFetched(true);
      //     console.log(dataList)
      // }
      // getData();
      // axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(response => {
        setDataList(response.data);
        console.log(response.headers);
        console.log(dataList);
        setIsFetched(true)
        setMotorcycles(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Box minH={'80vh'} paddingRight={[1, null, 5]} justfy={'center'} align={'center'}>
      <Heading>Report Page </Heading>
      {dataList.map(data => (
        <Box key={data.id} mb={{ sm: 2, md: 4 }}>
          <Center><HStack><Heading>{data.violation.name}</Heading><Text> reported on </Text><Heading>{data.date_reported}</Heading></HStack></Center>
          <Text mb={2}>{data.violation.description} commited by <Tag>{data.motorcycle_info.plate_number}</Tag></Text>
          <hr />
        </Box>
      ))}
    </Box>
  )
}

export default ReportPage;