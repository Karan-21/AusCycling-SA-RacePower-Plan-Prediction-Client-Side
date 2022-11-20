import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const FrontWheelTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.frontWheelType}>
            <FormLabel>Front Wheel Type</FormLabel>
            <Select
                id="frontWheelType"
                bg="gray.50"
                {...register("frontWheelType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Standard">Standard Box Rim</option>
                <option value="Minimal">Minimal Depth (30s)</option>
                <option value="Medium">Medium Depth (60s)</option>
                <option value="Deep">Deep Depth (90s)</option>
                <option value="Tri">Tri-Spoke</option>
            </Select>
            <FormErrorMessage>
                {errors.frontWheelType && errors.frontWheelType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default FrontWheelTypeField;
