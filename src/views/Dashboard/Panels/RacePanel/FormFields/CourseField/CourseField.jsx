import React from "react";

import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

const CourseField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.course}>
            <FormLabel>Course</FormLabel>
            <Select
                id="bike"
                bg="gray.50"
                {...register("course", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Course</option>
                <option value="Sample bike">course1</option>
            </Select>
            <FormErrorMessage>{errors.course && errors.course.message}</FormErrorMessage>
        </FormControl>
    );
};

export default CourseField;
