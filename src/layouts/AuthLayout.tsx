import trello_left from '@/assets/images/trello-left.svg';
import trello_right from '@/assets/images/trello-right.svg';

function AuthLayout({ children }) {
  return (
    <div className={'relative h-screen bg-primary @container'}>
      <div
        className={
          ' rounded-sm shadow-md absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  bg-secondary py-[20px] px-[40px] min-w-[400px]'
        }
      >
        {children}
      </div>
      <img
        src={trello_left}
        alt='Background left'
        className='absolute w-[150px]  laptop:w-[400px] left-0 bottom-5 z-1'
      />
      <img
        src={trello_right}
        alt='Background right'
        className='absolute  w-[150px] laptop:w-[400px] right-0 bottom-5 z-1'
      />
    </div>
  );
}

export default AuthLayout;
