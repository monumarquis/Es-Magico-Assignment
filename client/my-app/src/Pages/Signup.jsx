import React, { useState } from 'react'
import Swal from "sweetalert2"
import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Container,
    InputRightElement,
    InputGroup,
    useToast
} from "@chakra-ui/react";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
const initState = {
    name:"",
    email: "",
    password: "",
};
const Signup = () => {
    const [formData, setFormData] = useState(initState);
    const navigate = useNavigate()
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
        try {
            let {data} = await axios.post("http://localhost:8001/user/register", {...formData,role:"user"})
            toast({
                title: data.message,
                description: "We've created your account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setLoading(false)
            navigate('/login')
        } catch ({ response: { data } }) {
            Swal.fire({
                icon: 'error',
                title:data.message
              })
              setLoading(false)
        }

    };
    console.log(formData);

    return (
        <div style={{ textAlign: "center" }}>
            <Heading my="10">Sign in Form</Heading>
            <form onSubmit={handelForm} style={{ width: "100%" }}>
                <Container
                    maxW="40%"
                    mb="10"
                    borderRadius="20"
                    centerContent
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
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
                            required={true}
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
                            required={true}
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
                        <Button colorScheme="red" py="5" mt="10" type="submit" isLoading={loading} loadingText='Account is Creating'>
                            Register
                        </Button>
                    </FormControl>
                </Container>
            </form>
        </div>
    )
}

export default Signup