import React from "react";

import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightAddon,
} from "@chakra-ui/react";

const BikeWeightField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.bikeWeight}>
            <FormLabel>Bike Weight</FormLabel>
            <InputGroup>
                <Input
                    id="bikeWeight"
                    placeholder="Bike Weight"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("bikeWeight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="kg" />
            </InputGroup>
            <FormErrorMessage>
                {errors.bikeWeight && errors.bikeWeight.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default BikeWeightField;
