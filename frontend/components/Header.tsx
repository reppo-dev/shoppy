import LightDarkToggle from "./light-dark";

const Header = () => {
  return (
    <div className="px-10 mx-auto w-max py-6 flex justify-between items-center">
      <LightDarkToggle />
    </div>
  );
};

export default Header;
