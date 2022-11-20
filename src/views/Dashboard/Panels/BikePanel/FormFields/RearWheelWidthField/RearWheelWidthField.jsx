import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const RearWheelWidthField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.rearWheelWidthType}>
            <FormLabel>Rear Wheel Width Type</FormLabel>
            <Select
                id="rearWheelWidthType"
                bg="gray.50"
                {...register("rearWheelWidthType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Narrow">Narrow</option>
                <option value="Wide">Wide</option>
            </Select>
            <FormErrorMessage>
                {errors.rearWheelWidthType && errors.rearWheelWidthType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RearWheelWidthField;
