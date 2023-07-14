import axios from '../functions/axios';
import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import userContext from '../functions/userContext';
import { Navigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
export default function LoginPage() {
    const [user, setUser] = useState(useContext(userContext))
    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [respMessage, setRespMessage] = useState('')

    const login = async (username, password) => {
        let loginURL = "http://127.0.0.1:8000/accounts/login";
        axios.post(loginURL, {
            "username": username, "password": password,
        },)
            .then(response => {
                console.log(response.data);
                user.username = response.data.username;
                // setRespMessage(response.json())
                console.log(response.headers);
                setIsLoggedIn(true);
                return <Navigate replace to="dashboard/main" />;
            })
            .catch(error => {
                console.log(error)
                setSubmitted(false)

                console.log(error.response.data[0])
                setErrorMsg(error.response.data[0])
            })
    }
    function submitForm(e) {
        e.preventDefault()
        console.log(username)
        console.log(password)
        setSubmitted(true)
    }
    useEffect(() => {
        if (submitted) {
            login(username, password)
        }
    }, [submitted])
    if (isLoggedIn) {
        return <Navigate to="/dashboard/main" />
    }

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}
            bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login To Your Account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        To Access Reported Incidents <Link color={'blue.400'}>Clear</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Username</FormLabel>
                            <Input type="username" onChange={e => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={e => setPassword(e.target.value)} />
                        </FormControl>

                        <Stack my={5}
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link color={'blue.400'}>Forgot password?</Link>
                        </Stack>
                        <Stack spacing={5}>
                            {errorMsg === null ? '' : <Text fontSize={12} color={'red.400'} textAlign={'center'}>{errorMsg}</Text>}
                            <Button
                                bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={submitForm}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                    {/* {errorMessage !==? <Box><Text>{errorMessage}</Text></Box>}: <Box><Text>{respMessage}</Text></Box>} */}
                </Box>
            </Stack>
        </Flex>
    );
}