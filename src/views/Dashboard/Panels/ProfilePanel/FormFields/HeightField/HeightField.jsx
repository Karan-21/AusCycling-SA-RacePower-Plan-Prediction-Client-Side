import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const HeightField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.height}>
            <FormLabel>Height</FormLabel>
            <InputGroup>
                <Input
                    id="height"
                    placeholder="Height"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("height", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="cm" />
            </InputGroup>
            <FormErrorMessage>{errors.height && errors.height.message}</FormErrorMessage>
        </FormControl>
    );
};

export default HeightField;
