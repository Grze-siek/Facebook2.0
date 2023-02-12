import Image from 'next/image';

function Contact({ src, name }) {
  return (
    <div className="flex space-x-2 items-center mb-2 relative hover:bg-gray-300 cursor-pointer p-2 rounded-xl">
      <Image
        className="rounded-full"
        src={src}
        width={50}
        height={50}
        objectFit="cover"
        layout="fixed"
      />
      <p>{name}</p>
      <div className="rounded-full absolute bottom-2 left-7 bg-green-400 h-3 w-3" />
    </div>
  );
}

export default Contact;
