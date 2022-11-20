import React from "react";

import {
    FormControl,
    FormLabel,
    Select,
    FormErrorMessage,
    Skeleton,
} from "@chakra-ui/react";

const RoleField = ({ roles, register, errors, isLoading = false }) => {
    return (
        <FormControl w="40%" isInvalid={errors.role}>
            <FormLabel>Role</FormLabel>
            <Skeleton rounded="md" isLoaded={!isLoading} fadeDuration={1}>
                <Select
                    id="role"
                    bg="gray.50"
                    {...register("role", {
                        required: "This is required.",
                        validate: value =>
                            value !== "" || "Please select a valid choice.",
                    })}
                >
                    {roles?.map(role => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </Select>
            </Skeleton>
            <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
        </FormControl>
    );
};

export default RoleField;
