import React from "react";

import { Controller } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    HStack,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";

const PreferredUnitsField = ({ control, errors, unitConversion }) => {
    return (
        <FormControl isInvalid={errors.preferredUnits}>
            <FormLabel>Preferred Units</FormLabel>
            <Controller
                control={control}
                name="preferredUnits"
                render={({ field: { value, onChange } }) => (
                    <RadioGroup
                        onChange={sys => {
                            unitConversion(sys);
                            onChange(sys);
                        }}
                        value={value}
                    >
                        <HStack w="100%" h="40px" spacing={4}>
                            <Radio value="Metric">Metric</Radio>
                            <Radio value="Imperial">Imperial</Radio>
                        </HStack>
                    </RadioGroup>
                )}
                rules={{ required: "This is required." }}
            />
            <FormErrorMessage>
                {errors.preferredUnits && errors.preferredUnits.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default PreferredUnitsField;
