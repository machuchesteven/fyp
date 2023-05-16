import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Text, Heading } from '@chakra-ui/react'

function DashboardPage() {
    const [dataList, setDataList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    useEffect(() => {
        
            axios.get('http://127.0.0.1:8000/api/reporting/report/')
            .then(response => { 
                    setDataList(response.data)
                    console.log(response.data[0]['desc_of_violation'])
                    setIsFetched(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    function datas() {
        if (isFetched) { 
            return <>
                {dataList.map((data, index)=>{
                    <Heading key={index}>{data['desc_of_violation']}</Heading>                   
            })}
            </>
        } else {
            
        }
    }

    return (<>
        <Sidebar>
            {dataList.map((data, index) => (
                <Text key={index}>{data['desc_of_violaton']}</Text>
            ))}
        </Sidebar>
    </>
    )
}

export default DashboardPage