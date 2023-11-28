import React from 'react'
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const HomePage = () => {
  return (
    <>
      <Container maxW={'xl'} centerContent>
        <Box
          d='flex'
          justifyContent='center'
          p={3}
          bg='white'
          w='100%'
          m='40px 0 15px 0'
          borderRadius='lg'
          borderWidth='1px'
          textAlign={"center"}
        >
          <Text fontSize='4xl' fontFamily='Work sans'>
            Connect with Your Friends
          </Text>
        </Box>
        <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
          <Tabs isFitted variant='soft-rounded'>
            <TabList mb='1em'>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><Login /></TabPanel>
              <TabPanel><SignUp /></TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
