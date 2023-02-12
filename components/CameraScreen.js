import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import WebcamCapture from './WebcamCapture';

function CameraScreen({ display, setImage }) {
  const [show, setShow] = useState(true);

  const closeWindow = (e) => {
    e.preventDefault();
    // setShow(false);
    display(false);
  };

  return (
    <>
      {show && (
        <div className={`relative bg-white rounded-2xl p-4 shadow-md mt-6`}>
          <WebcamCapture setImage={setImage} display={display} />
          <div
            onClick={closeWindow}
            className="absolute flex right-6 top-6 justify-end items-center z-50 p-2 rounded-full cursor-pointer bg-gray-500 opacity-75 hover:scale-105 text-white"
          >
            <XIcon className="h-8" />
          </div>
        </div>
      )}
    </>
  );
}

export default CameraScreen;
