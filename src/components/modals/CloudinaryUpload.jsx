import { createContext, useEffect, useState } from "react";
import { Fab } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            var myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        setPublicId(result.info.public_id);
                    }
                }
            );

            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <Fab
                variant="extended"
                id="upload_widget"
                onClick={initializeCloudinaryWidget}
                sx={{
                    margin: "10px 0px 20px 0px",
                    fontSize: "12px",
                    boxShadow: 'none'
                }}
            >
                <AddAPhotoIcon sx={{
                    marginRight: "10px",
                }} />
                <div>Seleciona una imagen</div>
            </Fab>

        </CloudinaryScriptContext.Provider>
    );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
