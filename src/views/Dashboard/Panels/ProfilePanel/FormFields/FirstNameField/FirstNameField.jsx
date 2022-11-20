import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const FirstNameField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.firstName}>
            <FormLabel>First Name</FormLabel>
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
    );
};

export default FirstNameField;
