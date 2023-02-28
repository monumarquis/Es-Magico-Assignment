import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../Redux/auth/auth.actions";
import { Navigate } from "react-router-dom";
const initState = {
    email: "",
    password: "",
};
const Login = () => {
    const [formData, setFormData] = useState(initState);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast()
    const dispatch = useDispatch()
    const { isAuth,isLoading, } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };
    const handelForm = (e) => {
        e.preventDefault();
        dispatch(LogIn(formData))
        setFormData(initState)
        console.log(formData);
    };
    console.log(formData);
    if (isAuth) {
        toast({
            description: "hurray ! logged in",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
        return <Navigate to="/user" />
    }
    return (
        <div style={{ textAlign: "center" }}>
            <Heading my="10">Log in Form</Heading>
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
                        <Button colorScheme="red" py="5" mt="10" type="submit" isLoading={isLoading} loadingText='Logging in'>
                            Register
                        </Button>
                    </FormControl>
                </Container>
            </form>
        </div>
    )
}

export default Login