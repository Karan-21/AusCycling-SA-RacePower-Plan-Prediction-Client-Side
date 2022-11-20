import React from "react";

import { Input, InputRightAddon, InputGroup } from "@chakra-ui/react";

const SegmentStartField = ({ segment, setSegmentInput }) => {
    const handleInputChange = e => {
        setSegmentInput({ ...segment, [e.target.name]: e.target.value });
    };

    return (
        <InputGroup>
            <Input
                name="segmentStart"
                placeholder="Segment Start"
                autoComplete="off"
                type="number"
                bg="gray.50"
                onChange={handleInputChange}
                value={segment.segmentStart}
            />
            <InputRightAddon children="km" />
        </InputGroup>
    );
};

export default SegmentStartField;
