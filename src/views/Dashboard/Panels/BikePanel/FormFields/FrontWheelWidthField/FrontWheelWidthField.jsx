import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const FrontWheelWidthField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.frontWheelWidthType}>
            <FormLabel>Front Wheel Width Type</FormLabel>
            <Select
                id="frontWheelWidthType"
                bg="gray.50"
                {...register("frontWheelWidthType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Narrow">Narrow</option>
                <option value="Wide">Wide</option>
            </Select>
            <FormErrorMessage>
                {errors.frontWheelWidthType && errors.frontWheelWidthType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default FrontWheelWidthField;
