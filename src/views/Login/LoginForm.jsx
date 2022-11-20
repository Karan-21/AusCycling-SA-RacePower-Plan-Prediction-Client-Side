import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/Auth/Auth.service";

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
} from "@chakra-ui/react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

const LoginForm = () => {
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
        const { email, password } = userData;

        await AuthService.signIn(email, password)
            .then(userCreds => {
                navigate("/dashboard");

                toast({
                    position: "bottom-left",
                    description: `Welcome Back ${userCreds.user.displayName}!`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    containerStyle: {
                        pb: 6,
                        pl: 6,
                        m: 0,
                    },
                });
            })
            .catch(err => {
                let error = { code: 0, message: "" };

                switch (err.code) {
                    case "auth/wrong-password":
                        error = { code: 401, message: "Incorrect Password." };
                        break;
                    case "auth/user-not-found":
                        error = { code: 500, message: "User Not Found." };
                        break;
                    case "auth/too-many-requests":
                        error = {
                            code: 429,
                            message: "Too Many Requests. Please Try Again Later.",
                        };
                        break;
                    default:
                        error = { code: 500, message: "Unknown Error." };
                }

                toast({
                    position: "bottom-left",
                    description: `${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    containerStyle: {
                        pb: 6,
                        pl: 6,
                        m: 0,
                    },
                });
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box minW={{ base: "90%", md: "450px" }}>
                <VStack spacing={4}>
                    <Box fontSize="xl">Welcome Back!</Box>
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
                {/** Login Button and Contact Admin Link */}
                <VStack mt={10} spacing={4}>
                    <Button
                        w="100%"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Login
                    </Button>
                    <Box>
                        Don't have an account?{" "}
                        <Link to="/signup">
                            <Box as="span" color="blue.500">
                                Sign Up.
                            </Box>
                        </Link>
                    </Box>
                </VStack>
            </Box>
        </form>
    );
};

export default LoginForm;
