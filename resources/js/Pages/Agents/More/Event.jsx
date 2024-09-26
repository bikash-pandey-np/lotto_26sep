import Layout from "../Components/Layout";
import { Link } from '@inertiajs/inertia-react';

const Event = ({ events }) => {
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <Link href={route('agent.more')} className="text-yellow-600 inline-block p-2 border border-yellow-600 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:text-white">
                        Back to More
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {events.map(event => (
                        <div key={event.id} className={`p-4 rounded-lg shadow-lg ${event.is_completed ? 'bg-blue-200' : 'bg-green-300'} text-black`}>
                            <h2 className="text-xl font-bold text-black">{event.title}</h2>
                            <p className="mt-2 text-black">{event.description}</p>
                            <p className="mt-2 text-black">Ticket Price: ${event.ticket_price}</p>
                            <p className="mt-2 text-black">Event Date: {event.end_date_np}</p>
                            <p className="mt-2 text-black">Status: {event.is_completed ? 'Completed' : 'Not Completed'}</p>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="font-semibold text-black">6 Match:</div>
                                <div className="text-red-500">{event['6_match']}</div>
                                <div className="font-semibold text-black">5 Match:</div>
                                <div className="text-red-500">{event['5_match']}</div>
                                <div className="font-semibold text-black">4 Match:</div>
                                <div className="text-red-500">{event['4_match']}</div>
                                <div className="font-semibold text-black">No Match:</div>
                                <div className="text-red-500">{event['no_match']}</div>
                            </div>
                            {!event.is_completed && (
                                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                                    Buy Ticket
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Event;