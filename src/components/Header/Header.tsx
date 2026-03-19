export default function Header({ children }) {
  return (
    <div className='h-[64px] shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)] flex items-center justify-between'>{children}</div>
  );
}
