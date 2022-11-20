import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const LastNameField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.lastName}>
            <FormLabel>Last Name</FormLabel>
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
                {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default LastNameField;
