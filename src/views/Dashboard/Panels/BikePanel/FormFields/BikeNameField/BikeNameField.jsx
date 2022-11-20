import React from "react";

import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

const BikeNameField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.bikeName}>
            <FormLabel>Bike Name</FormLabel>
            <Input
                id="bikeName"
                placeholder="Name"
                autoComplete="off"
                bg="gray.50"
                {...register("bikeName", {
                    required: "This is required.",
                })}
            />
            <FormErrorMessage>
                {errors.bikeName && errors.bikeName.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default BikeNameField;
