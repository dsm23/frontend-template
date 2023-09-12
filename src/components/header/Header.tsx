import { Fragment } from "react";
import type { FunctionComponent } from "react";
import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircle2 } from "lucide-react";
import { cn } from "~/utils";
import { auth } from "../../lib/firebase";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useRouteLoaderData("root") as { user: User | null };

  const logout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return (
    <header>
      <Disclosure as="nav" className="bg-gray-800" aria-label="Primary">
        {
          <>
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          cn("rounded-md px-3 py-2 text-sm font-medium", {
                            "bg-gray-900  text-white": isActive,
                            "text-gray-300 hover:bg-gray-700 hover:text-white":
                              !isActive,
                          })
                        }
                      >
                        React-hook-form
                      </NavLink>
                      <NavLink
                        to="/formik"
                        className={({ isActive }) =>
                          cn("rounded-md px-3 py-2 text-sm font-medium", {
                            "bg-gray-900  text-white": isActive,
                            "text-gray-300 hover:bg-gray-700 hover:text-white":
                              !isActive,
                          })
                        }
                      >
                        Formik
                      </NavLink>
                      <NavLink
                        to="/shadcn"
                        className={({ isActive }) =>
                          cn("rounded-md px-3 py-2 text-sm font-medium", {
                            "bg-gray-900  text-white": isActive,
                            "text-gray-300 hover:bg-gray-700 hover:text-white":
                              !isActive,
                          })
                        }
                      >
                        Shadcn Form
                      </NavLink>
                      <NavLink
                        to="/tanstack"
                        className={({ isActive }) =>
                          cn("rounded-md px-3 py-2 text-sm font-medium", {
                            "bg-gray-900  text-white": isActive,
                            "text-gray-300 hover:bg-gray-700 hover:text-white":
                              !isActive,
                          })
                        }
                      >
                        Tanstack (does not work)
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <UserCircle2 className="h-8 w-8 rounded-full text-gray-300" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={cn(
                                  active ? "bg-gray-100" : "",
                                  "flex w-full justify-start px-4 py-2 text-sm text-gray-700",
                                )}
                                onClick={logout}
                              >
                                {user?.displayName}
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={cn(
                                  active ? "bg-gray-100" : "",
                                  "flex w-full justify-start px-4 py-2 text-sm text-gray-700",
                                )}
                                onClick={logout}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {/* {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )} */}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  React-hook-form
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Formik
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Shadcn Form
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Tanstack
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserCircle2 className="h-10 w-10 rounded-full text-gray-300" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={logout}
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        }
      </Disclosure>
    </header>
  );
};

export default Header;
