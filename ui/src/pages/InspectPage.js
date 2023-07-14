import React from 'react'
import { Heading, Box, FormControl, Input, FormHelperText, FormLabel, Button, Flex, VStack, useColorModeValue, Center } from '@chakra-ui/react';
function InspectPage() {
  return (<>
    <Flex bg={useColorModeValue('gray.50', 'gray.800')} align={'center'} justify={'center'} minH={'80vh'}>

      <VStack maxW={'5xl'}>
        <Heading textAlign={'center'} my={5}>Inspect Your Motorcycle's Violations</Heading>
        <FormControl>
          <FormLabel my={5} textAlign={'center'}>Enter your Motorcycle Identity</FormLabel>
          <Input my={5} type='text' textAlign={'center'} />
          <FormHelperText my={5} textAlign={'center'}>We'll never misuse your identity</FormHelperText>
          <Center my={5}><Button px={10} borderColor={'blue.500'} py={2} color={'blue.500'} borderWidth={1}>Inspect</Button></Center>
        </FormControl>
      </VStack>
    </Flex>
  </>
  )
}

export default InspectPage;