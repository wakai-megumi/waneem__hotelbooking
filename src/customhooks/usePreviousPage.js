import { useEffect } from "react";

const usePreviousPage = () => {
    useEffect(() => {
        // Store the current page URL in session storage
        sessionStorage.setItem("previousPage", window.location.href);
    }, []);
};

export default usePreviousPage;
