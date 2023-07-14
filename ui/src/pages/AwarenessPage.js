import React from 'react'

import { Flex, Heading, Text, VStack, useColorModeValue, Center, Button } from '@chakra-ui/react'
function AwarenessPage() {
  return (<Flex bg={useColorModeValue('gray.50', 'gray.800')} align={'center'} justify={'center'} minH={'80vh'}>

    <VStack>
      <Heading>Join the movement for safer roads!</Heading>
      <Text my={5} textAlign={'center'}>Report motorcycle violations through our inclusive mobile app. <br />Together, let's create a culture of motorcycle safety in Tanzania.</Text>
      <Center my={5}><Button px={10} borderColor={'blue.500'} py={2} color={'blue.500'} borderWidth={1}>Receive Emails On Safety Tips</Button></Center>
    </VStack>
  </Flex>
  )
}

export default AwarenessPage