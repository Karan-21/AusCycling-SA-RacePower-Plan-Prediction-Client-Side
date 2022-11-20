import React from "react";

import { FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

const TerrainField = ({ register, errors }) => {
    return (
        <FormControl isInvalid={errors.terrain}>
            <FormLabel>Terrain</FormLabel>
            <Select
                id="terrainField"
                bg="gray.50"
                {...register("terrainField", {
                    required: "This is required.",
                    validate: value => value !== "" || "Please select a valid choice.",
                })}
            >
                <option value="">Select Terrain</option>
                <option value="Open Coast">Open Coast</option>
                <option value="Desert/Plains">Desert/Plains</option>
                <option value="Mixed/Populated">Mixed/Populated</option>
                <option value="Heavy Forest">Heavy Forest</option>
                <option value="Mountainous">Mountainous</option>
                <option value="Inner City">Inner City</option>
            </Select>
            <FormErrorMessage>
                {errors.terrainField && errors.terrainField.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TerrainField;
