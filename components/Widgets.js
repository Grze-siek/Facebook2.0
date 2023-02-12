import { SearchIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Contact from './Contact';

const contacts = [
  {
    name: 'Bradd Pitt',
    src: 'https://www.elle.pl/media/cache/big/uploads/media/default/0007/83/brad-pitt.jpeg',
  },
  {
    name: 'Sylwester Stallone',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkAWdmMgOGL3gsZ8tTUCmOpzm3bXrpP2luw&usqp=CAU',
  },
  {
    name: 'Cristiano Ronaldo',
    src: 'https://zyciorysy.info/wp-content/uploads/2018/02/Cristiano-Ronaldo.jpg',
  },
  {
    name: 'Elon Musk',
    src: 'https://www.telepolis.pl/media/cache/resolve/amp_recommended_size/images/2022/10/elon-musk-majatek.jpg',
  },
  {
    name: 'Felix Kjellberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO483mYEJ3aRzCYsygXE83fUB9ZfmNnAWpyQ&usqp=CAU',
  },
];

function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-70 p-2 mt-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl mr-2">Constacts</h2>
        <div className="flex space-x-2 text-gray-500 ">
          <div className="plainIcon">
            <VideoCameraIcon className="h-6" />
          </div>
          <div className="plainIcon">
            <SearchIcon className="h-6" />
          </div>
          <div className="plainIcon">
            <DotsHorizontalIcon className="h-6" />
          </div>
        </div>
      </div>
      {contacts.map((contact) => (
        <Contact key={contact.src} src={contact.src} name={contact.name} />
      ))}
    </div>
  );
}

export default Widgets;
