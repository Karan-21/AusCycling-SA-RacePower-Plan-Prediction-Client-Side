import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const FTPField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.functionalThresholdPower}>
            <FormLabel>Functional Threshold Power (FTP)</FormLabel>
            <Input
                id="functionalThresholdPower"
                placeholder="FTP"
                autoComplete="off"
                bg="gray.50"
                type="number"
                step="any"
                {...register("functionalThresholdPower", {
                    required: "This is required.",
                })}
            />
            <FormErrorMessage>
                {errors.functionalThresholdPower &&
                    errors.functionalThresholdPower.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default FTPField;
