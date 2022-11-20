import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import config from "./foundations/config";
import fonts from "./foundations/fonts";
import components from "./components";

const theme = extendTheme({
    styles,
    config,
    fonts,
    components,
});

export default theme;
