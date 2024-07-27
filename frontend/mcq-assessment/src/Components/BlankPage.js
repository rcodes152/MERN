// src/Components/BlankPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlankPage = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        // Navigate to /instructions after a short delay
        const timer = setTimeout(() => {
            navigate('/instructions');
        }, 1000); // Redirect after 1 second

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [navigate]);

    return (
        <div className="blank-page">
            <h1>Loading...</h1>
        </div>
    );
};

export default BlankPage;
