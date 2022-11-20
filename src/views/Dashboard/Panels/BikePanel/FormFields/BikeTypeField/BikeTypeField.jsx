import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const BikeTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.bikeType}>
            <FormLabel>Bike Type</FormLabel>
            <Select
                id="bikeType"
                bg="gray.50"
                {...register("bikeType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Type</option>
                <option value="Road">Road</option>
                <option value="Aero">Aero Road</option>
                <option value="Tri">Tri/TT (entry Level)</option>
                <option value="Tri">Tri/TT</option>
                <option value="Gravel">Gravel</option>
                <option value="Mountain">Mountain</option>
            </Select>
            <FormErrorMessage>
                {errors.bikeType && errors.bikeType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default BikeTypeField;
