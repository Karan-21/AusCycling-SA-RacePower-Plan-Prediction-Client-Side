import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Center, Icon, Text } from "@chakra-ui/react";
import { AiOutlineUpload, AiFillRocket } from "react-icons/ai";

const FileUpload = ({ onFileAccepted }) => {
    const onDrop = useCallback(
        files => {
            onFileAccepted(files);
        },
        [onFileAccepted]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 2,
        multiple: true,
    });

    const text = isDragActive ? "Time to Drop!" : "Select a GPX File or Drop It Here...";

    return (
        <Center
            w="100%"
            h="180px"
            p={10}
            cursor="pointer"
            borderRadius={20}
            border="2px"
            borderColor="gray.400"
            borderStyle="dashed"
            bg={isDragActive ? "gray.100" : "transparent"}
            _hover={{ bg: "gray.100" }}
            transition="background-color 0.1s ease"
            {...getRootProps()}
        >
            <input {...getInputProps()} />

            {isDragActive ? (
                <Icon as={AiFillRocket} mr={2} />
            ) : (
                <Icon as={AiOutlineUpload} mr={2} />
            )}
            <Text>{text}</Text>
        </Center>
    );
};

export default FileUpload;
