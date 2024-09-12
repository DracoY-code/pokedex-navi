import NavigationBar from "../../components/NavigationBar";

export default function Loading() {
  return (
    <>
      <NavigationBar />
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </>
  );
}
