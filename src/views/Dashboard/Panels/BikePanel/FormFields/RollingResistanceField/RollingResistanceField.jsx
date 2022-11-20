import React from "react";

import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
} from "@chakra-ui/react";

const RollingResistanceField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.rollingResistance}>
            <FormLabel>Rolling Resistance</FormLabel>
            <InputGroup>
                <Input
                    id="rollingResistance"
                    placeholder="Rolling Resistance"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("rollingResistance", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>
            <FormErrorMessage>
                {errors.rollingResistance && errors.rollingResistance.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RollingResistanceField;
