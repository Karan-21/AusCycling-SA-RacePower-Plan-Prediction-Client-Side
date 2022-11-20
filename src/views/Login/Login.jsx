import React from "react";

import LoginForm from "./LoginForm";
import { HStack, Image, Flex } from "@chakra-ui/react";
import loginImage from "../../assets/images/login-image.jpg";

const Login = () => {
    return (
        <HStack pt="96px" spacing={0}>
            <Image
                w="60vw"
                h="calc(100vh - 96px)"
                src={loginImage}
                objectFit="cover"
                objectPosition="right"
                alt="Login Page Image"
            />
            <Flex
                w="40vw"
                h="calc(100vh - 96px)"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                bg="white"
            >
                <LoginForm />
            </Flex>
        </HStack>
    );
};

export default Login;
