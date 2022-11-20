import React from "react";

import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

const CourseNameField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.courseName}>
            <Input
                id="courseName"
                placeholder="Course Name"
                autoComplete="off"
                bg="gray.50"
                {...register("courseName", {
                    required: "This is required.",
                })}
            />
            <FormErrorMessage>
                {errors.courseName && errors.courseName.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default CourseNameField;
