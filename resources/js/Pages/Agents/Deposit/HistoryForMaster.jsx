import Layout from "../Components/Layout";
import { Link } from '@inertiajs/inertia-react';

const HistoryForMaster = ({ logs }) => {
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
                <div className="mt-6 grid grid-cols-1 gap-4">
                    {logs.map(log => (
                        <div key={log.identifier} className="grid grid-cols-2 items-center p-4 border rounded-lg shadow-md bg-white">
                            <div className="flex flex-col">
                                <span className="text-lg font-medium text-black">
                                    {log.transfered_to.agent_code}
                                </span>
                                <span className="text-sm text-gray-500">{new Date(log.datetime).toLocaleString()}</span>
                            </div>
                            <span className="text-lg font-medium text-black justify-self-end">NPR {log.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default HistoryForMaster;
