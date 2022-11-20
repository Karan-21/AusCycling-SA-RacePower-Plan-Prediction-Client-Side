import React from "react";

import {
    FormControl,
    FormLabel,
    HStack,
    Select,
    FormErrorMessage,
} from "@chakra-ui/react";

const GenderField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.gender}>
            <FormLabel>Gender</FormLabel>
            <HStack spacing={6} alignItems="flex-start">
                <Select
                    id="gender"
                    bg="gray.50"
                    {...register("gender", {
                        required: "This is required.",
                        validate: value =>
                            value !== "" || "Please select a valid choice.",
                    })}
                >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </Select>
            </HStack>
            <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
        </FormControl>
    );
};

export default GenderField;
