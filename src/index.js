import React, { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App";

import { ColorModeScript } from "@chakra-ui/react";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <StrictMode>
        <ColorModeScript />
        <Router>
            <App />
        </Router>
    </StrictMode>
);
