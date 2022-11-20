import React from "react";

import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

const BikeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.bike}>
            <FormLabel>Bike</FormLabel>
            <Select
                id="bike"
                bg="gray.50"
                {...register("bike", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Bike</option>
                <option value="Sample bike">bike1</option>
            </Select>
            <FormErrorMessage>{errors.bike && errors.bike.message}</FormErrorMessage>
        </FormControl>
    );
};

export default BikeField;
