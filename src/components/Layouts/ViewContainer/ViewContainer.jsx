import React from "react";

import { Container, Box } from "@chakra-ui/react";

const ViewContainer = ({ children, maxW = "container.xl" }) => {
    return (
        <Container maxW={maxW}>
            <Box w="100%" py={6}>
                {children}
            </Box>
        </Container>
    );
};

export default ViewContainer;
