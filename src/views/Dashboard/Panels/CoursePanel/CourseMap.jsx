import "leaflet/dist/leaflet.css";
import React from "react";
import L from "leaflet";

import { MapContainer, Polyline, TileLayer, Marker, Popup } from "react-leaflet";
import { chakra, Box } from "@chakra-ui/react";

const TerrainColors = {
    1: "#FF8B01",
    2: "#F55301",
    3: "#EB1C01",
};

const GetIcon = (iconPath, iconSize) => {
    return L.icon({
        iconUrl: iconPath,
        iconSize: iconSize,
        iconAnchor: [iconSize / 2, iconSize],
    });
};

const ChakraMapContainer = chakra(MapContainer, {
    baseStyle: {
        h: "full",
        w: "full",
    },
});

const CourseMap = ({ courseData, segments, curMousePos }) => {
    const sumLats = courseData.lat
        .map(c => c)
        .reduce((prev, curr) => (curr += prev), 0.0);
    const sumLons = courseData.long
        .map(c => c)
        .reduce((prev, curr) => (curr += prev), 0.0);
    const centerPos = [sumLats / courseData.lat.length, sumLons / courseData.long.length];

    return (
        <Box w="100%" h="400px">
            <ChakraMapContainer
                center={centerPos}
                zoom={13}
                minZoom={13}
                maxZoom={18}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/** Track Start Marker */}
                <Marker
                    position={courseData.loc_coords}
                    icon={GetIcon(require("./startMarker.png"), 35)}
                    autoPanOnFocus={false}
                >
                    <Popup>
                        Start Position ({courseData.loc_coords[0]},{" "}
                        {courseData.loc_coords[1]}).
                    </Popup>
                </Marker>
                {/** Track End Marker */}
                <Marker
                    position={courseData.zipped_latlon.at(-1)}
                    icon={GetIcon(require("./endMarker.png"), 35)}
                    autoPanOnFocus={false}
                >
                    <Popup>
                        End Position ({courseData.zipped_latlon.at(-1)[0]},{" "}
                        {courseData.zipped_latlon.at(-1)[1]}).
                    </Popup>
                </Marker>
                {/** Bike Marker */}
                <Marker
                    position={courseData.zipped_latlon[curMousePos]}
                    icon={GetIcon(require("./bikeMarker.png"), 35)}
                    autoPanOnFocus={false}
                />
                <Polyline
                    pathOptions={{
                        color: "#3298FF",
                        weight: 5,
                        lineJoin: "round",
                    }}
                    positions={[courseData.zipped_latlon]}
                />
                {segments.map(segment => (
                    <Polyline
                        key={segment.id}
                        pathOptions={{
                            color: TerrainColors[segment.terrain],
                            weight: 5,
                            lineJoin: "round",
                        }}
                        positions={[
                            courseData.zipped_latlon.slice(
                                segment?.segmentStartIndex,
                                segment?.segmentEndIndex
                            ),
                        ]}
                    />
                ))}
            </ChakraMapContainer>
        </Box>
    );
};

export default CourseMap;
