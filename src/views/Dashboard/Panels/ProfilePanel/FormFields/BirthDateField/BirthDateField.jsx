import React from "react";

import { Controller } from "react-hook-form";
import { DatePicker } from "../../../../../../components/Forms";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const BirthDateField = ({ control, errors }) => {
    return (
        <FormControl isInvalid={errors.dateOfBirth}>
            <FormLabel>Date of Birth</FormLabel>
            <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { value, onChange } }) => (
                    <DatePicker
                        onChange={date => onChange(date)}
                        selectedDate={value}
                        dateFormat="dd-MM-yyyy"
                    />
                )}
                rules={{ required: "This is required." }}
            />
            <FormErrorMessage>
                {errors.dateOfBirth && errors.dateOfBirth.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default BirthDateField;
