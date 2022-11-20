import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const DistanceField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.distance}>
            <FormLabel>Distance</FormLabel>
            <InputGroup>
                <Input
                    id="distance"
                    placeholder="Distance"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("distance", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
                <InputRightAddon children="km" />
            </InputGroup>
            <FormErrorMessage>
                {errors.distance && errors.distance.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default DistanceField;
