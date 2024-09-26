import Layout from "../Components/Layout";

const Index = ({ logs }) => {
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <h1 className="text-2xl font-bold">Deposit Logs</h1>
                <div className="mt-6 grid ">
                    {logs.map(log => (
                        <div key={log.identifier} className="flex justify-between items-center border-b py-2 shadow-md">
                            <div className="flex flex-col">
                                <span className="text-lg font-medium"><span className="text-sm">From</span> <br />{log.transfered_from.agent_code}</span>
                                <span className="text-sm text-gray-500">{new Date(log.datetime).toLocaleString()}</span>
                            </div>
                            <span className="text-lg font-medium text-green-700">NPR {log.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Index;
