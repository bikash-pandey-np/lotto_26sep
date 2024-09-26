import React, {useEffect} from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { FaBoxes } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const {flash} = usePage().props
    useEffect(() => {
        if(flash.success)
        {
            toast.dismiss();
            toast.success(flash.success)
        }

        if(flash.error)
        {
            toast.dismiss();
            toast.error(flash.error)
        }
    }, [flash]);
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 overflow-auto">
                {children}
            </div>
            <nav className="bg-gray-800 border-t border-gray-700 fixed bottom-0 left-0 right-0">
                <div className="flex justify-around p-2">
                    <a href="/home" className="flex flex-col items-center text-gray-300 hover:text-white">
                        <FaHome className="text-xl" />
                        <span className="text-sm">Dashboard</span>
                    </a>
                    <a href={route('agent.deposit')} className="flex flex-col items-center text-gray-300 hover:text-white">
                        <GrTransaction className="text-xl" />
                        <span className="text-sm">Transactions</span>
                    </a>
                    <a href={route('agent.more')} className="flex flex-col items-center text-gray-300 hover:text-white">
                        <FaBoxes className="text-xl" />
                        <span className="text-sm">More</span>
                    </a>
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
};

export default Layout;
