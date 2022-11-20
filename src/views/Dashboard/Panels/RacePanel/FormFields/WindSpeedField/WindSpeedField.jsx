import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const WindSpeedField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.windSpeedField}>
            <FormLabel>Wind Speed</FormLabel>
            <InputGroup>
                <Input
                    id="windSpeed"
                    placeholder="wind speed"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("windSpeed", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="km/h" />
            </InputGroup>
            <FormErrorMessage>
                {errors.windSpeedField && errors.windSpeedField.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default WindSpeedField;
