import Layout from "../Components/Layout";

const Index = () => {
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <h1 className="text-2xl font-bold">More</h1>

            <div className="mt-6">
                <ul className="mt-4 space-y-2">
                    <li>
                        <a href={route('agent_more_event')} className="text-blue-600 hover:underline">Events</a>
                    </li>
                    <hr />
                    <li>
                        <a href="" className="text-blue-600 hover:underline">Earning Logs</a>
                    </li>
                    <li>
                        <a href={route('agent_more_ticket')} className="text-blue-600 hover:underline">Tickets</a>
                    </li>
                </ul>
            </div>
            </div>
        </Layout>
    );
};

export default Index;