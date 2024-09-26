import Layout from "../Components/Layout";
import { Link } from '@inertiajs/inertia-react';

const Ticket = () => {
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tickets</h1>
                    <Link href={route('agent.more')} className="text-green-600 inline-block p-2 border border-green-600 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                        Issue Ticket
                    </Link>
                </div>



            </div>
        </Layout>
    );
};

export default Ticket;