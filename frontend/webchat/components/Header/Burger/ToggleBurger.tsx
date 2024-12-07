import useBurgerStore from "@/store/useBurgerStore";

const ToggleBurger = () => {
  const { toggleBurger } = useBurgerStore();
  return (
    <div
      className="block HAMBURGER-ICON space-y-2 sm:hidden"
      onClick={() => toggleBurger()}
    >
      <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    </div>
  );
};

export default ToggleBurger;
