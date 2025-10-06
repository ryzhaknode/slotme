import AuthForm from '../../components/AuthForm/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px] mt-[120px]">
      <div className="bg-white p-[36px] rounded-[28px] flex flex-col md:flex-row justify-between gap-[24px]">
        <div className="w-[550px]">
          <h1 className="text-4xl pt-[34px] text-[40px] mb-[12px]">Sign in</h1>
          <p>to continue to Real Time Chat</p>
        </div>
        <div className="md:w-1/2">
          <AuthForm type="login" title="sign in" />
        </div>
      </div>
    </div>
  );
}
