import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";

const EmailField = ({ register, errors }) => {
    return (
        <FormControl w="60%" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
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
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
    );
};

export default EmailField;
