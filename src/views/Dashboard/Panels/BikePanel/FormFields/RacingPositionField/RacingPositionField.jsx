import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const RacingPositionField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.racingPosition}>
            <FormLabel>Racing Position</FormLabel>
            <Select
                id="racingPosition"
                bg="gray.50"
                {...register("racingPosition", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Position</option>
                <option value="Tops">Tops</option>
                <option value="Hoods">Hoods</option>
                <option value="Drops">Drops</option>
                <option value="Aerobars">Aerobars (Aerobars Triathlete)</option>
                <option value="Midpack">Aerobars (Midpack Triathlete)</option>
                <option value="Advanced">Aerobars (Advanced Triathlete)</option>
                <option value="Elite">Aerobars (Elite/Pro Time Trial)</option>
                <option value="Mountain">Mountain Bikes Bars</option>
            </Select>
            <FormErrorMessage>
                {errors.racingPosition && errors.racingPosition.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RacingPositionField;
