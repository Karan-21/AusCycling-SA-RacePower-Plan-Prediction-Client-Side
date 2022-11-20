import React from "react";

import { Controller } from "react-hook-form";
import { DatePicker } from "../../../../../../components/Forms";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const RaceTimeField = ({ control, errors }) => {
    return (
        <FormControl isInvalid={errors.raceTime}>
            <FormLabel>Race Time</FormLabel>
            <Controller
                control={control}
                name="raceTime"
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
                {errors.raceTime && errors.raceTime.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default RaceTimeField;
