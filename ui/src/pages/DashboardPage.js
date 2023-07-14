import axios from '../functions/axios';
import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { Text, Heading, Card, Box, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import userContext from '../functions/userContext';
import { Outlet, Navigate } from 'react-router-dom';

export default function DashboardPage() {
    const [dataList, setDataList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [motorcycles, setMotorcycles] = useState([]);
    const controller = new AbortController();
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
                console.log(dataList);
                setIsFetched(true)
                setMotorcycles(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (<>
        <Sidebar>
            <Box maxW={'6xl'}>
                <Heading my={5}>Welcome Dashboard for System Administrators</Heading>
                <SimpleGrid columns={3} spacing={5} my={5}>
                    <Card backgroundColor='blue.400' color='white'>
                        <Text textAlign={'center'} mt={3}>Reported</Text>
                        <CardBody>
                            <Heading textAlign={'center'}>{dataList.length}</Heading>
                        </CardBody>
                    </Card>
                    <Card backgroundColor={'green.400'} color={'white'}>
                        <Text textAlign={'center'} mt={3}>Detected</Text>
                        <CardBody>
                            <Heading textAlign={'center'}>{dataList.length}</Heading>
                        </CardBody>
                    </Card>
                    <Card backgroundColor={'red.400'} color={'white'}>
                        <Text textAlign={'center'} mt={3} >Violated</Text>
                        <CardBody>
                            <Heading textAlign={'center'}>0</Heading>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* {user.username == null ? <Navigate to='/login' /> : (<> */}

                <Outlet datas={dataList} />

            </Box></Sidebar>
        {/* </>
            )} */}
    </>);
}

// <userContext.Provider value={{ username: user.username }}> </userContext.Provider>