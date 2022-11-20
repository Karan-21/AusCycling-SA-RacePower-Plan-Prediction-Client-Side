import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const ClimbingPositionField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.climbingPosition}>
            <FormLabel>Climbing Position</FormLabel>
            <Select
                id="climbingPosition"
                bg="gray.50"
                {...register("climbingPosition", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Position</option>
                <option value="Upright">Upright</option>
                <option value="Tops">Tops</option>
                <option value="Hoods">Hoods/Bullhorns</option>
                <option value="Mountain">Mountain Bike Bars</option>
            </Select>
            <FormErrorMessage>
                {errors.climbingPosition && errors.climbingPosition.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default ClimbingPositionField;
