import {useState} from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import axios from 'axios'

function ReportListPage() {
  const [data, setData]= useState([])
  axios.get('http://127.0.0.1:8000/api/reporting/report/')
    .then(function (response) {
      console.log(response)
      setData(response.data)
      console.log(data)
    })
  return (
    <Box minW={{ base: '100%', md: '80%'}} marginX={{base: 0, md: '10%'}} >
      <Box p={5} margin={3} borderWidth={1} borderColor={'black'} borderRadius={5}>
        
        <Heading size={'lg'}>MC209BXX: violation type</Heading>
        <Text>Reported from Kindoni: at 20:22</Text>
      </Box>
      
    </Box>
  )
}



export default ReportListPage;