import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useToast,
    Container,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react'
import axios from 'axios';
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../Redux/userProfile/userprofile.actions';
const initState = {
    name: "",
    email: "",
    password: "",
};
const Popup = ({ onClose, isOpen }) => {
    const [formData, setFormData] = useState(initState);
    const dispatch = useDispatch()
    const toast = useToast()
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };
    const handelForm = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            let { data } = await axios.patch("http://localhost:8001/user/udpdateProfile", { ...formData }, config)
            toast({
                title: data.message,
                description: "We've updated your account info for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setLoading(false)
            onClose()
            dispatch(getUserProfile())
        } catch ({ response: { data } }) {
            Swal.fire({
                icon: 'error',
                title: data.message
            })
            setLoading(false)
        }

    };
    console.log(formData);

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={handelForm} style={{ width: "100%" }}>
                <ModalContent>
                    <ModalHeader>Edit information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container
                            maxW="90%"
                            mb="5"
                            borderRadius="20"
                            centerContent
                        >
                            <FormControl py="10" maxW="80%">
                                <FormLabel fontWeight="700" mt="10">
                                    Name
                                </FormLabel>
                                <Input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    variant="flushed"
                                    pl="3"
                                />
                                <FormLabel fontWeight="700" mt="10">
                                    Email
                                </FormLabel>
                                <Input
                                    name="email"
                                    type="text"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="flushed"
                                    pl="3"
                                />
                                <FormLabel fontWeight="700" mt="10">
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        name="password"
                                        type={show ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        variant="flushed"
                                        pl="3"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                            </FormControl>
                        </Container>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="red" py="5"  type="submit" isLoading={loading} loadingText='Account is Updating'>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default Popup