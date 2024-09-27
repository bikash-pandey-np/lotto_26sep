import React, { useState } from 'react';
import Layout from "../Components/Layout";
import { Link } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
const HistoryForMaster = ({ logs }) => {
    const [date, setDate] = useState('');


    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleFilter = () => {
        if (new Date(date) > new Date())
        {
            toast.dismiss();
            toast.error("Selected date cannot be in the future", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
        }

        Inertia.get(route('agent.deposit_history'), {
            date: date
        });
        
    }

    const resetFilter = () => {
        Inertia.get(route('agent.deposit_history'));
    }
    console.log(logs);
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Transfer Logs</h1>
                    <Link href={route('agent.deposit')} className="text-green-600 inline-block p-2 border border-green-600 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                        Back
                    </Link>
                </div>
                <div className="flex flex-col items-center mb-4 bg-gray-100 p-2 rounded-md">
                   
                    <div className="w-full mb-2">
                        <input
                            type="date"
                            className="w-full p-2 border border-black rounded text-black placeholder-black"
                            onChange={handleDate}
                            value={date}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300" onClick={handleFilter}>
                            Filter
                        </button>
                        <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-300" onClick={resetFilter}>
                            Reset
                        </button>
                    </div>
                </div>
                <div className="mt-6 grid">
                    <p className="mb-2">Showing {logs.length} results</p>
                    <hr />
                    {logs.length > 0 ? (
                        logs.map(log => (
                            <div key={log.identifier} className="flex justify-between items-center border-b py-2 shadow-md">
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium"><span className="text-sm">To</span> <br />{log.transfered_to.agent_code}</span>
                                    <span className="text-sm text-gray-500">{new Date(log.datetime).toLocaleString()}</span>
                                </div>
                                <span className="text-lg font-medium text-red-700">- NPR {log.amount}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            No transfer logs available.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default HistoryForMaster;
