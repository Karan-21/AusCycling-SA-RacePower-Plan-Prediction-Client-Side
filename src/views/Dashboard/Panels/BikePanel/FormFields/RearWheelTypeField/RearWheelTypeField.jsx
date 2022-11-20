import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const RearWheelTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.rearWheelType}>
            <FormLabel>Rear Wheel Type</FormLabel>
            <Select
                id="rearWheelType"
                bg="gray.50"
                {...register("rearWheelType", {
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
                <option value="Disc">Disc</option>
            </Select>
            <FormErrorMessage>
                {errors.rearWheelType && errors.rearWheelType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RearWheelTypeField;
