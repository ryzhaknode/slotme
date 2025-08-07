import AuthForm from '../../components/AuthForm/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px]">
      <div className="bg-white p-[36px] rounded-[28px] flex flex-col md:flex-row justify-between gap-[24px]">
        <div className="w-[550px]">
          <h1 className="text-4xl pt-[34px] text-[40px] mb-[12px] leading-[1.25]">Create a Real Time Chat Account</h1>
          <p>Enter your name and email</p>
        </div>
        <div className="md:w-1/2">
          <AuthForm type="register" title="register" />
        </div>
      </div>
    </div>
  );
}
