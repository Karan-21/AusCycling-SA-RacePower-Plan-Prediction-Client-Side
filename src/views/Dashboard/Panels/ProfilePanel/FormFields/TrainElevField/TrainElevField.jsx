import React from "react";

import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    FormErrorMessage,
} from "@chakra-ui/react";

const TrainElevField = ({ register, errors, selectedUnits }) => {
    return (
        <FormControl isInvalid={errors.trainingElevation}>
            <FormLabel>Training Elevation</FormLabel>
            <InputGroup>
                <Input
                    id="trainingElevation"
                    placeholder="Training Elevation"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("trainingElevation", {
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
                {errors.trainingElevation && errors.trainingElevation.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TrainElevField;
