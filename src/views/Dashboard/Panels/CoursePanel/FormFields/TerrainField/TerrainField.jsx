import React from "react";

import { Select } from "@chakra-ui/react";

const TerrainField = ({ segment, setSegmentInput, terrainTypes }) => {
    const handleInputChange = e => {
        setSegmentInput({ ...segment, [e.target.name]: parseInt(e.target.value) });
    };

    return (
        <Select
            name="terrain"
            bg="gray.50"
            value={segment?.terrain}
            onChange={handleInputChange}
        >
            {terrainTypes.map((val, i) => (
                <option key={i} value={i}>
                    {val}
                </option>
            ))}
        </Select>
    );
};

export default TerrainField;
