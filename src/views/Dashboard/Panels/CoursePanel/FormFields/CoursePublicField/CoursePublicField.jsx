import React from "react";

import { Controller } from "react-hook-form";
import {
    FormControl,
    FormErrorMessage,
    HStack,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";

const CoursePublicField = ({ control, errors, setValue }) => {
    return (
        <FormControl isInvalid={errors.coursePublic}>
            <Controller
                control={control}
                name="coursePublic"
                render={({ field: { value, onChange } }) => (
                    <RadioGroup
                        onChange={x => {
                            setValue("coursePublic", x);
                            onChange(x);
                        }}
                        value={value}
                    >
                        <HStack w="100%" h="40px" spacing={4}>
                            <Radio value="Public">Public</Radio>
                            <Radio value="Private">Private</Radio>
                        </HStack>
                    </RadioGroup>
                )}
                rules={{ required: "This is required." }}
            />
            <FormErrorMessage>
                {errors.coursePublic && errors.coursePublic.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default CoursePublicField;
