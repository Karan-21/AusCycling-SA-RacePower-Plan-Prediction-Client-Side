import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const RaceNameField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.raceName}>
            <FormLabel>Race Name</FormLabel>
            <Input
                id="raceName"
                placeholder="Race Name"
                autoComplete="off"
                bg="gray.50"
                {...register("raceName", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            />
            <FormErrorMessage>
                {errors.raceName && errors.raceName.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RaceNameField;
