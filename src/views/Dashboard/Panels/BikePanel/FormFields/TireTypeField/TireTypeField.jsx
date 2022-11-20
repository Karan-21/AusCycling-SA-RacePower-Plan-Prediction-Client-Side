import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const TireTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.tireType}>
            <FormLabel>Tire Type</FormLabel>
            <Select
                id="tireType"
                bg="gray.50"
                {...register("tireType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Clincher">Clincher (narrow 19-21)</option>
                <option value="Clincher">Clincher (medium 22-24)</option>
                <option value="Clincher">Clincher (wide 25-28)</option>
                <option value="Tubular">Tubular (narrow 19-21)</option>
                <option value="Tubular">Tubular (medium 22-24)</option>
                <option value="Tubular">Tubular (wide 25-28)</option>
                <option value="Gravel">Gravel Tires</option>
                <option value="Mountain">Mountain Bike Tires</option>
            </Select>
            <FormErrorMessage>
                {errors.tireType && errors.tireType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TireTypeField;
