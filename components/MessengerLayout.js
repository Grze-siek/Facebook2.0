import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

function MessengerLayout({ children }) {
  return (
    <>
      <ChatHeader />
      <main>{children}</main>
      <ChatInput />
    </>
  );
}

export default MessengerLayout;
