import React, { useRef, useState } from "react";

function CameraCapture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    // Function to start the camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing the camera: ", error);
        }
    };

    // Function to capture a photo
    const capturePhoto = () => {
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, width, height);
        
        // Convert canvas image to data URL and save it
        const imageData = canvasRef.current.toDataURL("image/png");
        setPhoto(imageData);
    };

    return (
        <div>
            <button onClick={startCamera}>Open Camera</button>
            <div>
                <video ref={videoRef} autoPlay style={{ display: photo ? "none" : "block" }} />
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
            <button onClick={capturePhoto}>Capture Photo</button>
            {photo && (
                <div>
                    <h3>Captured Photo:</h3>
                    <img src={photo} alt="Captured" />
                </div>
            )}
        </div>
    );
}

export default CameraCapture;
