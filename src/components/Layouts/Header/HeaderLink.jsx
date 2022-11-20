import React from "react";
import { useLocation, Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

const HeaderLink = ({ children, to, ...rest }) => {
    const { pathname } = useLocation();

    return (
        <Box color={to === pathname ? "white" : "#A9A9A9"}>
            <Link to={to} {...rest}>
                {children}
            </Link>
        </Box>
    );
};

export default HeaderLink;
