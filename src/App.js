import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthService } from "./services";
import { firebaseObserver } from "./services/Firebase/Firebase.service";

import { ChakraProvider, Fade } from "@chakra-ui/react";
import { Header, LoadScreen } from "./components/Layouts";
import { ProtectedRoute } from "./components/Routes";

import theme from "./assets/styles/theme";
import { Admin, Dashboard, Home, Login, SignUp } from "./views";
import { BikeView } from "./views/Dashboard/Panels";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.signedIn());
    const [isAdmin, setIsAdmin] = useState(AuthService.signedIn());
    const [isLoading, setIsLoading] = useState(false);
    const [mainBodyIsLoading, setMainBodyIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            setTimeout(() => {
                setMainBodyIsLoading(true);
            }, 400);
        }, 1500);

        firebaseObserver.subscribe("authStateChanged", data => {
            setIsAuthenticated(data);
        });
        firebaseObserver.subscribe("hasAdminClaim", data => {
            setIsAdmin(data);
        });
        return () => {
            firebaseObserver.unsubscribe("authStateChanged");
            firebaseObserver.unsubscribe("hasAdminClaim");
        };
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <Header
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                isLoading={isLoading}
            />
            <Fade in={mainBodyIsLoading} unmountOnExit>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute hasAccess={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <ProtectedRoute hasAccess={isAuthenticated && isAdmin}>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path=":userId">
                        <Route path=":bikeId" element={<BikeView />} />
                    </Route>
                </Routes>
            </Fade>
            <LoadScreen isLoading={isLoading} />
        </ChakraProvider>
    );
}

export default App;
