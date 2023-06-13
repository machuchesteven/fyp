import axios from '../functions/axios';
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Text, Heading, Button } from '@chakra-ui/react'
import userContext from '../functions/userContext';


function DashboardPage() {
    const [dataList, setDataList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [motorcycles, setMotorcycles] = useState([]);
    const controller = new AbortController();
    const [requestLogout, setRequestLogout] = useState(false);
    const csrftoken = document.cookie.split()
    const logOut = async () => {
        let loginURL = "http://127.0.0.1:8000/accounts/logout";
        axios.post(loginURL, {
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
            logOut();
        }
    }, []);
    function Datas() {
        return <>
            <Heading>{dataList.map(obj => {
                <Text key={obj['id']}>{obj.name}</Text>
            })}
            </Heading>
            {dataList.map((data) => {
                <Heading key={data.id}>{data.date_reported}</Heading>
            })}
        </>
    }

    return (<>
        <userContext.Provider value={{ username: 'Anonymous' }}>
            <Sidebar>
                {dataList.map(data => (
                    <Heading key={data.id}>{data.violation.name}</Heading>
                ))}
                <Button onClick={logOut}>Log Out</Button>
                <Heading>Headingata Goes Here</Heading>
            </Sidebar>
        </userContext.Provider>
    </>
    )
}

export default DashboardPage;