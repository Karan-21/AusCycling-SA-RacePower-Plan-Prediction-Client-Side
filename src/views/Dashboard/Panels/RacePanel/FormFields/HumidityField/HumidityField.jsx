import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const HumidityField = ({ register, errors, selectedUnits }) => {
    return (
        <FormControl isInvalid={errors.humidity}>
            <FormLabel>Humidity</FormLabel>
            <InputGroup>
                <Input
                    id="humidity"
                    placeholder="humidity"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("humidity", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Cannot be less than 0%.",
                        },
                        max: {
                            value: 100,
                            message: "Cannot be larger than 100%.",
                        },
                    })}
                />
                <InputRightAddon children="%" />
            </InputGroup>
            <FormErrorMessage>
                {errors.humidity && errors.humidity.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default HumidityField;
