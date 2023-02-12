import StoryCard from './StoryCard';

const stories = [
  {
    name: 'Bradd Pitt',
    src: 'https://m.media-amazon.com/images/M/MV5BMjI1ODQzNzQ3MV5BMl5BanBnXkFtZTcwMjAxNjUyMw@@._V1_.jpg',
    profile:
      'https://www.elle.pl/media/cache/big/uploads/media/default/0007/83/brad-pitt.jpeg',
  },
  {
    name: 'Sylwester Stallone',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbYMIQ5TVrAuWAe86PbBG3mMbW4ol1eflGg&usqp=CAU',
    profile:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkAWdmMgOGL3gsZ8tTUCmOpzm3bXrpP2luw&usqp=CAU',
  },
  {
    name: 'Cristiano Ronaldo',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDw8CoA6FMfprs_U2DPrp5H9vvjaFE_iMGA&usqp=CAU',
    profile:
      'https://zyciorysy.info/wp-content/uploads/2018/02/Cristiano-Ronaldo.jpg',
  },
  {
    name: 'Elon Musk',
    src: 'https://bi.im-g.pl/im/9a/bf/1b/z29096090AMP,Elon-Musk-na-Halloween.jpg',
    profile:
      'https://www.telepolis.pl/media/cache/resolve/amp_recommended_size/images/2022/10/elon-musk-majatek.jpg',
  },
  {
    name: 'Felix Kjellberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTVbgDRIlA8McKvCRpc8PxY5lAOn4_Q-tSQA&usqp=CAU',
    profile:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO483mYEJ3aRzCYsygXE83fUB9ZfmNnAWpyQ&usqp=CAU',
  },
];

function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <StoryCard
          key={story.src}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
}

export default Stories;
