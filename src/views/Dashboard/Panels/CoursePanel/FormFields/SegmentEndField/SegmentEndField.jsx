import React from "react";

import { Input, InputRightAddon, InputGroup } from "@chakra-ui/react";

const SegmentEndField = ({ segment, setSegmentInput }) => {
    const handleInputChange = e => {
        setSegmentInput({ ...segment, [e.target.name]: e.target.value });
    };

    return (
        <InputGroup>
            <Input
                name="segmentEnd"
                placeholder="Segment End"
                autoComplete="off"
                type="number"
                bg="gray.50"
                onChange={handleInputChange}
                value={segment.segmentEnd}
            />
            <InputRightAddon children="km" />
        </InputGroup>
    );
};

export default SegmentEndField;
