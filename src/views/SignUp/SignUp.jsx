import React from "react";

import SignUpForm from "./SignUpForm";
import { HStack, Image, Flex } from "@chakra-ui/react";
import signupImage from "../../assets/images/login-image.jpg";

const SignUp = () => {
    return (
        <HStack pt="96px" spacing={0}>
            <Image
                w="60vw"
                h="calc(100vh - 96px)"
                src={signupImage}
                objectFit="cover"
                objectPosition="right"
                alt="Sign Up Page Image"
            />
            <Flex
                w="40vw"
                h="calc(100vh - 96px)"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                bg="white"
            >
                <SignUpForm />
            </Flex>
        </HStack>
    );
};

export default SignUp;
