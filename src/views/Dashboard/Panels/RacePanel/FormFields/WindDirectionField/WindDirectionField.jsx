import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const WindDirectionField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.windDirection}>
            <FormLabel>Wind Direction</FormLabel>
            <InputGroup>
                <Input
                    id="windDirection"
                    placeholder="Wind Direction"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("windDirection", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="m" />
            </InputGroup>
            <FormErrorMessage>
                {errors.windDirectionField && errors.windDirectionField.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default WindDirectionField;
