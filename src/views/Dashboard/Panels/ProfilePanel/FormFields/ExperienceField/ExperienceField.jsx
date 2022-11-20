import React from "react";

import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

const ExperienceField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.experience}>
            <FormLabel>Experience</FormLabel>
            <Select
                id="experience"
                bg="gray.50"
                {...register("experience", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Experience</option>
                <option value="Recreational">Recreational</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
            </Select>
            <FormErrorMessage>
                {errors.experience && errors.experience.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default ExperienceField;
