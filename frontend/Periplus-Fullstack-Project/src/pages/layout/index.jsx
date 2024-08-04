import SendMessage from "../../components/module/send-message";
import { SendMessageMobile } from "../../components/module/send-message/mobile";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <div className="hidden lg:block">
        <SendMessage />
      </div>
      <SendMessageMobile />
    </>
  );
}
