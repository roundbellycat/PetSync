
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const backButton = () => {
        navigate("/");
    };

    return (
        <>
            <div>
                <h1>404 - Page Not Found</h1>

                <button
                    onClick={backButton}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                >
                    Go to Homepage
                </button>
            </div>
        </>
    );
};

export default NotFound;