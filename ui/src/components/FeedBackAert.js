import React, { useEffect, useState } from 'react'
import { Alert } from "@chakra-ui/react";



export default function FeedbackAlert({ status, children }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set the timeout to automatically hide the alert after 5 seconds (5000 milliseconds)
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 5000);

        // Cleanup the timeout when the component is unmounted
        return () => clearTimeout(timeout);
    }, []);
    return (
        <Alert status={status} >
            {children}
        </Alert>
    );
}