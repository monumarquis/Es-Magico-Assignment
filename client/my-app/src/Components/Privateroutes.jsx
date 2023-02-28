import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Privateroutes({ children }) {
    const { isAuth } = useSelector((state) => state.auth)
    const toast = useToast()
  if (!isAuth) {
    toast({
      title:"You are not Authenticated" ,
      description: "Please log in to our app",
      status: 'error',
      duration: 2000,
      isClosable: true,
  })
    return <Navigate to="/login" />;
  }
  return children;
}
