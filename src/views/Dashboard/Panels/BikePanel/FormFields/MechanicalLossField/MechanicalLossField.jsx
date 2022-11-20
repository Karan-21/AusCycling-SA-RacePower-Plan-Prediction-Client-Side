import React from "react";

import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
} from "@chakra-ui/react";

const MechanicalLossField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.mechanicalLoss}>
            <FormLabel>Mechanical Loss</FormLabel>
            <InputGroup>
                <Input
                    id="mechanicalLoss"
                    placeholder="Mechanical Loss"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("mechanicalLoss", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>
            <FormErrorMessage>
                {errors.mechanicalLoss && errors.mechanicalLoss.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default MechanicalLossField;
