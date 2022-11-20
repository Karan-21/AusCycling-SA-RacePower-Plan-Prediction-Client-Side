import React from "react";

import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
} from "@chakra-ui/react";

const Table = ({ children, columns, ...rest }) => {
    return (
        <TableContainer {...rest}>
            <ChakraTable variant="striped" colorScheme="blackAlpha">
                <Thead>
                    <Tr>
                        {columns.map(column => (
                            <Th key={column}>{column}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>{children}</Tbody>
            </ChakraTable>
        </TableContainer>
    );
};

export default Table;
