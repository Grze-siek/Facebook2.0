import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import CameraScreen from './CameraScreen';

function InputBox() {
  const session = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const [takePic, setTakePic] = useState(false);

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url');

          removeImage();

          uploadTask.on(
            'state_change',
            null,
            (error) => console.error(error),
            () => {
              //When the upload complites
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection('posts').doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  const takePhoto = () => {
    setTakePic(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-2 shadow-md mt-6 font-medium text-gray-500">
        <div className="flex items-center p-4 space-x-4">
          <Image
            className="rounded-full"
            src={session.data.user.image}
            width={40}
            height={40}
            layout="fixed"
          />
          <form className="flex flex-1">
            <input
              ref={inputRef}
              className="rounded-full bg-gray-100 h-12 flex-grow px-5 focus:outline-none"
              type="text"
              placeholder={`What's on your mind, ${session.data.user.name}?`}
            />
            <button hidden type="submit" onClick={sendPost}>
              Submit
            </button>
          </form>

          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer"
            >
              <img className="h-10 object-contain" src={imageToPost} />
              <p className="text-xs text-red-500 text-center">REMOVE</p>
            </div>
          )}
        </div>
        <div className="flex justify-evenly border-t p-3">
          <div onClick={takePhoto} className="inputIcon">
            <VideoCameraIcon className="h-7 text-red-500" />
            <p className="text-xs sm:text-sm lg:text-base">Live Video</p>
          </div>
          <div
            onClick={() => filePickerRef?.current.click()}
            className="inputIcon"
          >
            <CameraIcon className="h-7 text-green-400" />
            <p className="text-xs sm:text-sm lg:text-base">Photo/Video</p>
            <input
              ref={filePickerRef}
              onChange={addImageToPost}
              type="file"
              hidden
            />
          </div>
          <div className="inputIcon">
            <EmojiHappyIcon className="h-7 text-yellow-300" />
            <p className="text-xs sm:text-sm lg:text-base">Feeling/Activity</p>
          </div>
        </div>
      </div>
      {takePic && (
        <CameraScreen display={setTakePic} setImage={setImageToPost} />
      )}
    </>
  );
}

export default InputBox;
