import { Flex, Input, Td, Tr, useToast } from '@chakra-ui/react'
import Swal from "sweetalert2"
import React, { useState } from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getAllUserProfile } from '../Redux/allUsers/allUsers.actions'
const SingleTableUser = ({ name, id, role, password, email }) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [showInput, setShowInput] = useState(false)
    const [Role, setRole] = useState(role)

    const handleDelete = async () => {
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            const { data } = await axios.delete(`http://localhost:8001/user/${id}`, config);
            console.log(data)
            toast({
                title: data.message,
                description: "We've deleted user account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllUserProfile())
        } catch ({ response: { data } }) {
            Swal.fire({
                icon: 'error',
                title: data.message
            })
        }
    }

    const handleEditInput = async () => {
        setShowInput((prev) => !prev)
    }

    const handleEdit = async () => {
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            const { data } = await axios.patch(`http://localhost:8001/user`, { userId: id, role: Role }, config);
            console.log(data)
            toast({
                title: data.message,
                description: "We've edit user account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllUserProfile())
        } catch ({ response: { data } }) {
            Swal.fire({
                icon: 'error',
                title: data.message
            })
        }
    }


    return (
        <>
            <Tr>
                <Td>{name}</Td>
                <Td>{email}</Td>
                <Td>{password}</Td>
                <Td>{showInput ? <Flex flexDir="row" alignItems={"center"} >
                    <Input h="25px" w="100px" type="text" value={Role} onChange={({ target: { value } }) => setRole(value)} />
                    <TiTick color="gray" fontSize={"35"} cursor={"pointer"} onClick={handleEdit} />
                </Flex> : role}</Td>
                <Td>
                    <Flex flexDir="row" p="0" w="55px" justifyContent={"space-between"}> 
                        <RiDeleteBin2Fill color="red.300" cursor={"pointer"}  onClick={handleDelete} />
                        <FaRegEdit color="red.300" cursor={"pointer"}  onClick={handleEditInput} />
                    </Flex>
                </Td>

            </Tr>
        </>
    )
}

export default SingleTableUser