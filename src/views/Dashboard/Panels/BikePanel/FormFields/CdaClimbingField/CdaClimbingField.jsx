import React from "react";

import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";

const CdaClimbingField = ({ register, errors, selectedUnits }) => {
    return (
        <FormControl isInvalid={errors.Name}>
            <FormLabel>CdA Climbing (Drag Coefficient)</FormLabel>
            <FormLabel>Yaw Angle -- CdA</FormLabel>
            <InputGroup>
                <InputLeftAddon children={selectedUnits === "Metric" ? "0°" : "0°"} />
                <Input
                    id="cda"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>

            <br />

            <InputGroup>
                <InputLeftAddon children={selectedUnits === "Metric" ? "5°" : "5°"} />
                <Input
                    id="cda"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>

            <br />
            <InputGroup>
                <InputLeftAddon children={selectedUnits === "Metric" ? "10°" : "10°"} />
                <Input
                    id="cda"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>

            <br />
            <InputGroup>
                <InputLeftAddon children={selectedUnits === "Metric" ? "15°" : "15°"} />
                <Input
                    id="cda"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>

            <br />
            <InputGroup>
                <InputLeftAddon children={selectedUnits === "Metric" ? "20°" : "20°"} />
                <Input
                    id="cda"
                    autoComplete="off"
                    bg="gray.50"
                    type="number"
                    step="any"
                    {...register("weight", {
                        required: "This is required.",
                        min: {
                            value: 0,
                            message: "Must be larger than 0.",
                        },
                    })}
                />
            </InputGroup>

            <FormErrorMessage>{errors.Name && errors.Name.message}</FormErrorMessage>
        </FormControl>
    );
};

export default CdaClimbingField;
