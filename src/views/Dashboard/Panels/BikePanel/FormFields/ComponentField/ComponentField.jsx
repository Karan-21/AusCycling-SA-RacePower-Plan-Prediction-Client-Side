import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const ComponentField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.bikeComponent}>
            <FormLabel>Component</FormLabel>
            <Select
                id="bikeComponent"
                bg="gray.50"
                {...register("bikeComponent", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Component</option>
                <option value="High">High End</option>
                <option value="Mid">Mid Range</option>
                <option value="Entry">Entry Level</option>
            </Select>
            <FormErrorMessage>
                {errors.bikeComponent && errors.bikeComponent.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default ComponentField;
