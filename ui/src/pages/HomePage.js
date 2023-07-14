import React, { useState, useContext } from 'react'
import { Flex, Heading, Text, Button, Center, Modal, ModalCloseButton, ModalHeader, ModalContent, ModalBody, ModalOverlay, ModalFooter, useDisclosure, useColorModeValue, Box, VStack, FormLabel, FormControl, Input, Icon, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import getLocation from '../functions/getLocation'
import axios from 'axios'


function pickLocation() {
    let area = getLocation(true)
    return area
}

function HomePage() {
    const [desc, setDesc] = useState('')
    const [number, setNumber] = useState('')
    const [violation, setViolation] = useState('')
    const [image, setImage] = useState('')
    console.log(process.env.API_PATH)
    function submitReport() {
        axios.post('http://127.0.0.1:8000/accounts/quick-report', {
            'violation': violation,
            'number': number,
            'description': desc,
            'image': image
        }).then(response => {
            console.log(response);
        });
    }

    function ReportForm() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
                <Button onClick={onOpen}>Report Incident</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Report Motorcyclist Incident</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id="violation">
                                <FormLabel>Violation Name</FormLabel>
                                <Input type="text" name="violation" onChange={(e) => setViolation(e.value)} />
                            </FormControl>
                            <FormControl id="number">
                                <FormLabel>Motorcycle Number</FormLabel>
                                <Input type="text" name="number" onChange={(e) => setNumber(e.value)} />
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel>Violation Description</FormLabel>
                                <Input type="text" name='description' onChange={(e) => setDesc(e.value)} />
                            </FormControl>
                            <FormControl id="image">
                                <FormLabel>Pictorial Evidence</FormLabel>
                                <Input type="file" name="image" onChange={(e) => setImage(e.value)} />
                            </FormControl>
                            <Button marginY={5} onClick={pickLocation}>Confirm Report Location</Button>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={submitReport()}>
                                Submit Report
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <>
            <Flex bg={useColorModeValue('gray.50', 'gray.800')} align={'center'} justify={'center'} minH={'80vh'}>

                <VStack>
                    <Heading textAlign={'center'} marginY={[5, null, 15]}>Welcome To Motorcyclist Helmet Inspection System</Heading>
                    <Text textAlign={'center'} marginY={5}>The system Helps You Report Any Incident concerning Motorcyclists in Tanzania,<br />
                        Our Aim is to join hands with you in reducing incidents including motorcycles</Text>
                    <Text textAlign={'center'} my={5}>
                        Report on Mobile Application
                    </Text>
                    <Center my={5}><HStack>
                        <ReportForm />
                        <Button as={Link} color={'blue.500'} borderColor={'blue.500'} borderWidth={1}>Download App</Button>
                    </HStack></Center>
                </VStack>
            </Flex>
        </>
    )
}

export default HomePage
