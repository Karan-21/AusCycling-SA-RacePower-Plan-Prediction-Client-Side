import React from "react";

import { Box, VStack } from "@chakra-ui/react";

const PanelContainer = ({ children }) => {
    return (
        <Box w="100%" h="100%">
            <VStack w="100%" spacing={6} alignItems="flex-start">
                {children}
            </VStack>
        </Box>
    );
};

export default PanelContainer;
