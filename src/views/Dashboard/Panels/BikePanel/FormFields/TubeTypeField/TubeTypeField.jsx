import React from "react";

import { FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";

const TubeTypeField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.tubeType}>
            <FormLabel>Tube Type</FormLabel>
            <Select
                id="tubeType"
                bg="gray.50"
                {...register("tubeType", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Type</option>
                <option value="Butyl">Butyl</option>
                <option value="Latex">Latex</option>
                <option value="Tubleless">Tubleless</option>
            </Select>
            <FormErrorMessage>
                {errors.tubeType && errors.tubeType.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TubeTypeField;
