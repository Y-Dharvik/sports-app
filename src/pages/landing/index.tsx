// landing page
//The navigation bar should include the application name and provide options for user sign-in and sign-up.
import { Disclosure } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"
const Landing: React.FC = () => {
    const navigation = [
        { name: "Sign in", href: "/signin" },
        { name: "Sign up", href: "/signup" },
    ]
    return (
        //navigation bar on the top
        <>
            <Disclosure as="nav" className="border-b border-slate-200">
                {() => (
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-red-500">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-12 w-12 sm:h-14 sm:w-14 mr-2"
                                        src={Logo}
                                        alt="Smarter Tasks"
                                    />
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <button
                                            key={item.name}
                                            className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                                        >
                                            <Link to={item.href}>{item.name}</Link>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Disclosure>

        </>
    );
};

export default Landing;




