import { Button,  Flex, Image, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../Redux/userProfile/userprofile.actions'
import Popup from '../Components/Popup'
const UserDashboard = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, loading } = useSelector((state) => state.user)
  
  console.log(data);
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  return (
    <>
      {loading ? <Flex flexDir={"column"} width={"40%"} m="auto" justifyContent={"center"} >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex> :
        <Flex flexDir={"column"} width={"40%"} m="auto" justifyContent={"center"} mt="10" >
          <Image objectFit={"cover"} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" width={"100%"} height={"300px"} alt="userimage" />
          <Text >Name: {data.name}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Role: {data.role}</Text>
          <Button colorScheme='red' onClick={onOpen} >Edit</Button>
        </Flex>}
        <Popup onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default UserDashboard