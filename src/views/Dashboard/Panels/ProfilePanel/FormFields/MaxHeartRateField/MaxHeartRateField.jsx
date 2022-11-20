import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const MaxHeartRateField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.maxHeartRate}>
            <FormLabel>Max Heart Rate</FormLabel>
            <Input
                id="maxHeartRate"
                placeholder="Max HR"
                autoComplete="off"
                bg="gray.50"
                type="number"
                step="any"
                {...register("maxHeartRate", {
                    required: "This is required.",
                })}
            />
            <FormErrorMessage>
                {errors.maxHeartRate && errors.maxHeartRate.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default MaxHeartRateField;
