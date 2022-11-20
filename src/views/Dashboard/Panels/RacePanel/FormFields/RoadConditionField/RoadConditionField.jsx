import React from "react";

import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

const RoadConditionField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.roadCondition}>
            <FormLabel>Road Condition</FormLabel>
            <Select
                id="roadConditionField"
                bg="gray.50"
                {...register("roadConditionField", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Condition</option>
                <option value="Perfect (track surface)">Perfect (track surface)</option>
                <option value="Good (smooth asphalt)">Good (smooth asphalt)</option>
                <option value="Average (typical road mix)">
                    Average (typical road mix)
                </option>
                <option value="Poor (cracked/worn roads)">
                    Poor (cracked/worn roads)
                </option>
                <option value="Off Road (gravel)">Off Road (gravel)</option>
                <option value="Off Road (dirt)">Off Road (dirt)</option>
            </Select>
            <FormErrorMessage>
                {errors.roadConditionField && errors.roadConditionField.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RoadConditionField;
