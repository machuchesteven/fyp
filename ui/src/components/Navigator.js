import { useDisclosure, VStack, Flex, Button, HStack, chakra, Text, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, } from '@chakra-ui/react';
import axios from '../functions/axios';
import { Link, Navigate } from 'react-router-dom'
import React, { useRef, useContext } from "react";
import { IoMdMenu } from 'react-icons/io';
import userContext from '../functions/userContext';



function SimpleDrawer({ p = 15, placement = "right", width, isOpen, children, onClose, btnRef, title = "Menu", footer, }) {


  return (
    <Flex w={width}>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton alignSelf="end" mx={p} my={p} />
          <DrawerHeader my={p}>
            <Text as="p"> {title} </Text>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Flex display={{ base: "flex", md: "none" }}>
      <Button ref={btnRef} onClick={onOpen} borderColor={'#e3b305'} borderWidth={1} color={'#2008c4'}>
        <IoMdMenu size="26px" color="#2008c4" />
      </Button>

      <SimpleDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <VStack alignItems="left">
          <Link to='/report'>
            <Button variant="nav">Report</Button>
          </Link>
          <Link to='/awareness'>
            <Button variant="nav">Awareness</Button>
          </Link>
          <Link to='/inspect'>
            <Button variant="nav">Inspect</Button>
          </Link>
        </VStack>
      </SimpleDrawer>
    </Flex>
  );
};

export default function Navigator() {
  const user = useContext(userContext);

  const logOut = async () => {
    let logoutURL = "http://127.0.0.1:8000/accounts/logout";
    axios.post(logoutURL, {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data['message'])
        return <Navigate to="/login" />

      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <chakra.header id="header">
      <Flex
        w={{ base: "100%", md: '80%' }}
        mx={{ base: 'none', md: '10%' }}
        px={5}
        py={3}
        align="center"
        justify="space-between"
      >
        <HStack as={Link} to={'/#'}>
          <Text fontSize="28px" as='b'>HIS</Text>
        </HStack>
        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }}>
          <Link to='/report'>
            <Button variant="nav">Reports</Button>
          </Link>
          <Link to='/awareness'>
            <Button variant="nav">Awareness</Button>
          </Link>
          <Link to='/inspect'>
            <Button variant="nav">Inspect</Button>
          </Link>
        </HStack>
        <HStack> {user == "" ? <Button onClick={logOut} borderColor={'#e3b305'} borderWidth={1} color={'#2008c4'}>
          Logout
        </Button> : <Button as={Link} to="login" borderColor={'#e3b305'} borderWidth={1} color={'#2008c4'}>
          Login
        </Button>}

          <MobileDrawer />
        </HStack>

      </Flex>
    </chakra.header>
  );
}