import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Flex,
  Input,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUserProfile, getAllUserProfileBySearch } from '../Redux/allUsers/allUsers.actions'
import SingleTableUser from '../Components/SingleTableUser'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.allUser)
  const [name,setUser] = useState("")
  console.log(data);
  useEffect(() => {
    dispatch(getAllUserProfile())
  }, [])
  const handlesearch =({target:{value}}) => {
    setUser(value)
    dispatch(getAllUserProfileBySearch(name))
  }
  if (loading) {
    return <Flex flexDir={"column"} width={"40%"} m="auto" justifyContent={"center"} textAlign="center" >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  }
  return (
    <>
      <Input type="text" w="30%" placeholder='Search by name' value={name} onChange={handlesearch} my="10" />
      <TableContainer>
        <Table variant='striped' colorScheme='grey'>
          <TableCaption>All User details</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Password</Th>
              <Th>Role</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.length > 0 && data.map((el) => <SingleTableUser key={el._id} id={el._id} name={el.name}
              role={el.role} password={el.password} email={el.email}
            />)}

          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminDashboard