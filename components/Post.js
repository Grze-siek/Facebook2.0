import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon,
  XCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import { toast, Toaster } from 'react-hot-toast';

function Post({ id, name, message, email, postImage, image, timestamp }) {
  const [post, setPost] = useState(true);
  const session = useSession();

  const hidePost = () => {
    setPost(false);
  };

  const undoRemoval = () => {
    setPost(true);
  };

  const deletePost = (e) => {
    e.preventDefault();
    try {
      db.collection('posts').doc(id).delete();
      toast.success('Post Deleted');
    } catch (e) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <>
      {post ? (
        <div className="flex flex-col">
          <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  className="rounded-full"
                  src={image}
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-medium">{name}</p>

                  {timestamp ? (
                    <p className="text-xs text-gray-400">
                      {new Date(timestamp?.toDate()).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">Loading...</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="plainIcon hover:bg-gray-200 text-gray-500">
                  <DotsHorizontalIcon className="h-6" />
                </div>
                <div
                  onClick={
                    email == session.data.user.email ? deletePost : hidePost
                  }
                  className="plainIcon hover:bg-gray-200 text-gray-500"
                >
                  <XIcon className="h-6" />
                </div>
                <Toaster toastOptions={{ position: 'bottom-center' }} />
              </div>
            </div>

            <p className="pt-4">{message}</p>
          </div>

          {postImage && (
            <div className="relative h-56 md:h-96 bg-white">
              <Image src={postImage} objectFit="cover" layout="fill" />
            </div>
          )}

          {/* Footer of post */}
          <div className="flex justify-between items-center rounded-b-2xl shadow-md bg-white text-gray-500 border-t">
            <div className="inputIcon rounded-none rounded-bl-2xl">
              <ThumbUpIcon className="h-4" />
              <p className="text-xs sm:text-base">Like</p>
            </div>
            <div className="inputIcon rounded-none">
              <ChatAltIcon className="h-4" />
              <p className="text-xs sm:text-base">Comment</p>
            </div>
            <div className="inputIcon rounded-none rounded-br-2xl">
              <ShareIcon className="h-4" />
              <p className="text-xs sm:text-base">Share</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <XCircleIcon className="h-6 text-gray-500" />
              <p className="font-medium">Post has been hidden</p>
            </div>
            <div
              onClick={undoRemoval}
              className="flex items-center space-x-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <p className="font-medium">Undo</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
