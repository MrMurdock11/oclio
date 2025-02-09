const WelcomeBanner = () => {
  return (
    <div className="border-1 flex w-[31.5rem] flex-col gap-[1.25rem] rounded-[2.5rem] border-solid border-[#ffffff99] bg-[#ffffff4d] p-[2.5rem] text-white backdrop-blur-[20px]">
      <div className="text-[4rem]/[4.5rem] font-bold">
        🖋️ Platform for <span className="text-[#FF8787]">Independent</span>{" "}
        Writers
      </div>
      <div className="text-[1.5rem] font-bold">Create, Share, Inspire!</div>
      <span>Join now and showcase your writing talent to the world.</span>
    </div>
  );
};

export default WelcomeBanner;
