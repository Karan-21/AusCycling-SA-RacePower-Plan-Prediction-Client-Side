import React from "react";

import { Fade, Box, Flex, Spinner } from "@chakra-ui/react";

const LoadScreen = ({ isLoading }) => {
    return (
        <Fade in={!isLoading} unmountOnExit>
            <Box w="full" bg="gray.400">
                <Flex h="100vh" alignItems="center" justifyContent="center" color="white">
                    <Spinner />
                </Flex>
            </Box>
        </Fade>
    );
};

export default LoadScreen;
