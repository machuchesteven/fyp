import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Tag, HStack, Center, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
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
  return (<Flex bg={useColorModeValue('gray.50', 'gray.800')} align={'center'} justify={'center'} minH={'80vh'}>
    <VStack maxW={'6xl'}>
      <Box>
        <Heading>Here, You Get A Summary of The Ongoing Reports</Heading>
        {dataList.map(data => (
          <Box key={data.id} mb={{ sm: 2, md: 4 }}>
            <HStack><Heading>{data.violation.name}</Heading><Text> reported on </Text><Heading>{data.date_reported}</Heading></HStack>
            <Text mb={2}>{data.violation.description} commited by <Tag>{data.motorcycle_info.plate_number}</Tag></Text>
            <hr />
          </Box>
        ))}
      </Box>
    </VStack>
  </Flex>
  )
}

export default ReportPage;