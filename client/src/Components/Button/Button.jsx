import './button.css';

export default function Button({postCount,setPostCounnt}) {
  return (
      <button className='btn' onClick={(e) => setPostCounnt(postCount+6)}>
        show more
      </button>
  );
}
