import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const HelmetTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.helmetType}>
            <FormLabel>Helmet Type</FormLabel>
            <Select
                id="helmetType"
                bg="gray.50"
                {...register("helmetType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Road">Road</option>
                <option value="Aero">Aero</option>
                <option value="Mountain">Mountain</option>
            </Select>
            <FormErrorMessage>
                {errors.helmetType && errors.helmetType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default HelmetTypeField;
