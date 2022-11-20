import React from "react";

import { Box } from "@chakra-ui/react";

const PanelSection = ({ children, title, width = "100%" }) => {
    return (
        <Box w={width}>
            <Box
                px={6}
                py={3}
                bg="white"
                fontSize="xl"
                roundedTop="lg"
                border="1px"
                borderBottom={0}
                borderColor="gray.300"
            >
                {title}
            </Box>
            <Box
                bg="white"
                roundedBottom="lg"
                border="1px"
                borderColor="gray.300"
                overflow="hidden"
            >
                {children}
            </Box>
        </Box>
    );
};

export default PanelSection;
