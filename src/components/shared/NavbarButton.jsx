const NavbarButton = ({ bgColor, textColor, text, onClick }) => {
  return (
    <button
      className={`text-xl font-bold w-32 h-10 px-4 rounded-full transition-transform duration-300 hover:scale-110`}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default NavbarButton;
