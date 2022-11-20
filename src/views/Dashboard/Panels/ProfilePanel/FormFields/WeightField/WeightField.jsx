import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const WeightField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.weight}>
            <FormLabel>Weight</FormLabel>
            <InputGroup>
                <Input
                    id="weight"
                    placeholder="Weight"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="kg" />
            </InputGroup>
            <FormErrorMessage>{errors.weight && errors.weight.message}</FormErrorMessage>
        </FormControl>
    );
};

export default WeightField;
