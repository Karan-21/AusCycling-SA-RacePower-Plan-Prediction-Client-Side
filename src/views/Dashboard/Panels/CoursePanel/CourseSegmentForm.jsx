import React from "react";

import { SegmentStartField, SegmentEndField, TerrainField } from "./FormFields";
import { HStack, Button } from "@chakra-ui/react";

const CourseSegmentForm = ({
    terrainTypes,
    segmentInput,
    setSegmentInput,
    onSegmentAdd,
}) => {
    return (
        <HStack w="100%" spacing={4} alignItems="flex-start">
            {/** Segment Start Input Field */}
            <SegmentStartField segment={segmentInput} setSegmentInput={setSegmentInput} />
            {/** Segment End Input Field */}
            <SegmentEndField segment={segmentInput} setSegmentInput={setSegmentInput} />
            {/** Terrain Type Select Field */}
            <TerrainField
                segment={segmentInput}
                setSegmentInput={setSegmentInput}
                terrainTypes={terrainTypes}
            />
            {/** Add Segment Button */}
            <Button w="125px" colorScheme="green" onClick={onSegmentAdd}>
                Add
            </Button>
        </HStack>
    );
};

export default CourseSegmentForm;
