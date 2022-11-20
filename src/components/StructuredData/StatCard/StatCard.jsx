import React from "react";

import { Box, HStack, VStack } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

const StatCard = ({ title, children, ...rest }) => {
    return (
        <Box
            w="100%"
            h="100%"
            p={6}
            bgColor="white"
            rounded="lg"
            border="1px"
            borderColor="gray.300"
            cursor="pointer"
            _hover={{ borderColor: "gray.400" }}
            transition="0.1s ease"
            {...rest}
        >
            <VStack spacing={2} alignItems="flex-start">
                <HStack w="100%" justifyContent="space-between" alignItems="flex-start">
                    <Box color="gray.500">{title.toUpperCase()}</Box>
                    <BsArrowRight size="25px" />
                </HStack>
                <Box fontSize="2xl">{children}</Box>
            </VStack>
        </Box>
    );
};

export default StatCard;
