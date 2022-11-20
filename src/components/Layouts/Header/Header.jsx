import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../../../services/Auth/Auth.service";

import HeaderLink from "./HeaderLink";
import { Slide, Box, Container, Flex, HStack, Image, Button } from "@chakra-ui/react";
import acIcon from "../../../assets/images/ac-icon.png";

const Header = ({ isAuthenticated, isAdmin, isLoading }) => {
    return (
        <Box w="full" bg="#000410" hidden={!isLoading}>
            <Container maxW="container.xl">
                <Flex
                    h={24}
                    alignItems="center"
                    justifyContent="space-between"
                    color="white"
                >
                    <HeaderLink to="/">
                        <Image src={acIcon} h="40px" />
                    </HeaderLink>
                    <HStack h="100%" spacing={10}>
                        <HeaderLink to="/">Home</HeaderLink>
                        {isAuthenticated ? (
                            <Fragment>
                                <HeaderLink to="/dashboard">Dashboard</HeaderLink>
                                {isAdmin && <HeaderLink to="/admin">Admin</HeaderLink>}
                                <Button
                                    colorScheme="yellow"
                                    onClick={() => {
                                        AuthService.signOut();
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </Fragment>
                        ) : (
                            <HStack spacing={4}>
                                <Button
                                    as={Link}
                                    to="/login"
                                    colorScheme="white"
                                    variant="outline"
                                >
                                    Login
                                </Button>
                                <Button as={Link} to="/signup" colorScheme="yellow">
                                    Sign Up
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
