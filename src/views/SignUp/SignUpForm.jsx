import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";

import { useForm } from "react-hook-form";
import {
    VStack,
    Box,
    FormErrorMessage,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    HStack,
} from "@chakra-ui/react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();
    const toast = useToast();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async userData => {
        const { firstName, lastName, email, password } = userData;

        try {
            const userDetails = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            };

            await AuthService.createUserAccount(userDetails);
            await AuthService.signIn(email, password);

            navigate("/dashboard");

            toast({
                position: "bottom-left",
                description: `Welcome ${firstName} ${lastName}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
        } catch (err) {
            const { data } = err.response;

            // Notifies the user of an unsuccessful request.
            toast({
                position: "bottom-left",
                description: `${data}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    pb: 6,
                    pl: 6,
                    m: 0,
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box minW={{ base: "90%", md: "450px" }}>
                <VStack spacing={4}>
                    <Box fontSize="xl">Welcome!</Box>
                    {/** First Name and Last Name */}
                    <HStack w="100%">
                        <FormControl isInvalid={errors.firstName}>
                            <Input
                                id="firstName"
                                placeholder="First Name"
                                autoComplete="off"
                                bg="gray.50"
                                {...register("firstName", {
                                    required: "This is required.",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.lastName}>
                            <Input
                                id="lastName"
                                placeholder="Last Name"
                                autoComplete="off"
                                bg="gray.50"
                                {...register("lastName", {
                                    required: "This is required.",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>
                    {/** Username */}
                    <FormControl isInvalid={errors.email}>
                        <Input
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            bg="gray.50"
                            {...register("email", {
                                required: "This is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address.",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    {/** Password */}
                    <FormControl isInvalid={errors.password}>
                        <InputGroup>
                            <Input
                                id="password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                bg="gray.50"
                                {...register("password", {
                                    required: "This is required.",
                                })}
                            />
                            <InputRightElement
                                w="2.5rem"
                                cursor="pointer"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? (
                                    <AiOutlineUnlock size={20} />
                                ) : (
                                    <AiOutlineLock size={20} />
                                )}
                            </InputRightElement>
                        </InputGroup>
                        {/** Input Error Message */}
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>
                {/** Sign Up Button and Login Link */}
                <VStack mt={10} spacing={4}>
                    <Button
                        w="100%"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                    <Box>
                        Already have an account?{" "}
                        <Link to="/login">
                            <Box as="span" color="blue.500">
                                Login.
                            </Box>
                        </Link>
                    </Box>
                </VStack>
            </Box>
        </form>
    );
};

export default SignUpForm;
