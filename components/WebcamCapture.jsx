import { ArrowSmLeftIcon, EyeIcon } from '@heroicons/react/outline';
import { RefreshIcon } from '@heroicons/react/solid';
import { useRef, useCallback, useState } from 'react';
// import './cameraStyles.css';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

function WebcamCapture({ setImage, display }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const capturePic = (e) => {
    e.preventDefault();
    capture();
  };

  const retakePic = (e) => {
    e.preventDefault();
    setImgSrc(null);
  };

  const saveImage = (e) => {
    e.preventDefault();
    setImage(imgSrc);
    display(false);
  };

  return (
    <div className="flex justify-center webcam-container relative">
      {imgSrc ? (
        <div className="relative">
          <img src={imgSrc} alt="img" />
          <div
            onClick={retakePic}
            className="bg-gray-500 top-2 left-2 text-white hover:scale-105 p-2 opacity-75 rounded-full cursor-pointer absolute"
          >
            <RefreshIcon className="h-8" />
          </div>
        </div>
      ) : (
        <Webcam
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
      )}
      <div className="bottom-5 text-white absolute z-50">
        {imgSrc ? (
          <div>
            <button onClick={saveImage}>
              <EyeIcon className="h-12 text-green-500" />
            </button>
            <p>Opublikuj</p>
          </div>
        ) : (
          <button onClick={capturePic}>
            <EyeIcon className="h-12" />
          </button>
        )}
      </div>
    </div>
  );
}

export default WebcamCapture;
