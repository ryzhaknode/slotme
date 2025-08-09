export default function CustomLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-white bg-opacity-80 z-[99999]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
