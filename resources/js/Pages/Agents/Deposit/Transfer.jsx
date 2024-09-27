import Layout from "../Components/Layout";
import { useForm } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { FaHistory } from "react-icons/fa";

const Transfer = ({balance}) => {
    const { data, setData, post, processing, errors } = useForm({
        agent_code: '',
        amount: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('agent.transfer_funds'), {
            onSuccess: () => {
                setData({
                    agent_code: '',
                    amount: 0
                });
            }
        });
        
        // Handle form submission logic here
    };

    return (
        <Layout>
            <div className="mt-4 p-4">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Transfer Funds</h1>
                        <p className="mt-2">Balance: <span className="font-bold">Npr {balance}</span></p>
                    </div>
                    <div>
                        <Link href={route('agent.deposit_history')} className="text-green-600 inline-block p-2 border border-green-600 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                            <FaHistory />
                        </Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="agent_code">Agent Code</label>
                        <input
                            type="text"
                            id="agent_code"
                            placeholder="Enter agent code"
                            value={data.agent_code}
                            onChange={(e) => setData('agent_code', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                        {errors.agent_code && <div className="text-red-500 mt-2">{errors.agent_code}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                        {errors.amount && <div className="text-red-500 mt-2">{errors.amount}</div>}
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={processing}>
                        {processing ? 'Transferring...' : 'Transfer'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Transfer;
