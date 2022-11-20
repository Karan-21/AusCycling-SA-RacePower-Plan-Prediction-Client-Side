import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const TemperatureField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.temperature}>
            <FormLabel>Temperature</FormLabel>
            <InputGroup>
                <Input
                    id="temperature"
                    placeholder="temperature"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("temperature", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="&deg;C" />
            </InputGroup>
            <FormErrorMessage>
                {errors.temperature && errors.temperature.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TemperatureField;
