import React, { useState } from 'react';
import Layout from "../Components/Layout";
import { Link } from '@inertiajs/inertia-react';
import { FaTimes } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';

const Ticket = ({ tickets, events, filterMode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [eventFilter, setEventFilter] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleFilter = () => {
        // Implement your filter logic here
        console.log('Filtering with:', { searchTerm, dateFilter, statusFilter, eventFilter });
        // Close the sidebar after filtering
        setSidebarOpen(false);

        Inertia.get(route('agent_more_ticket'), { searchTerm, dateFilter, statusFilter, eventFilter });
    };


    const clearFilter = () => {
        setSearchTerm('');
        setDateFilter('');
        setStatusFilter('');
        setEventFilter('');
        setSidebarOpen(false);
        Inertia.get(route('agent_more_ticket'));
    };
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tickets</h1>
                    <div className="flex space-x-2">
                        {!filterMode && (
                            <button
                            onClick={toggleSidebar}
                            className="text-blue-600 inline-block p-2 border border-blue-600 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                        >
                            Filter
                        </button>
                        )}
                        {filterMode && (
                            <button
                                onClick={clearFilter}
                                className="text-red-600 inline-block p-2 border border-red-600 rounded transition duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                            >
                                Clear Filter
                            </button>
                        )}
                        <Link href={route('agent_more_issue_ticket')} className="text-green-600 inline-block p-2 border border-green-600 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                            Issue Ticket
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={`fixed inset-y-0 right-0 w-64 bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Filter Tickets</h2>
                            <button onClick={toggleSidebar} className="text-white">
                                <FaTimes />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Ticket No or Fullname or Phone No..."
                            className="w-full p-2 mb-4 border rounded text-black placeholder-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input
                            type="date"
                            className="w-full p-2 mb-4 border rounded text-black placeholder-black"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                        <select
                            className="w-full p-2 mb-4 border rounded text-black"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                        </select>
                        <select
                            className="w-full p-2 mb-4 border rounded text-black"
                            value={eventFilter}
                            onChange={(e) => setEventFilter(e.target.value)}
                        >
                            <option value="">Select Event</option>
                            {events && events.map((event) => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        
                        <button
                            onClick={handleFilter}
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>

                <div className="space-y-4">

                    <p className="text-lg font-semibold">Showing : {tickets.length} Tickets</p>
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <div key={ticket.id} className="border-b border-gray-200 shadow-md rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-lg">{ticket.ticket_no}</span>
                                    <span className={`px-2 py-1 rounded ${ticket.is_winner ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                        {ticket.is_winner ? 'Winner' : 'Not Won'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p><span className="font-medium">Name:</span> {ticket.fullname}</p>
                                        <p><span className="font-medium">Phone:</span> {ticket.phone_no}</p>
                                        <p><span className="font-medium">Ward:</span> {ticket.ward}</p>
                                    </div>
                                    <div>
                                        <p><span className="font-medium">Amount:</span> Rs. {ticket.amount}</p>
                                        <p><span className="font-medium">Date:</span> {new Date(ticket.created_at).toLocaleDateString()}</p>
                                        <p><span className="font-medium">Status:</span> <span className={ticket.has_expired ? 'text-red-500' : 'text-green-500'}>{ticket.has_expired ? 'Expired' : 'Active'}</span></p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="font-medium block">Event:</span> {ticket.event.title}
                                    <span className="font-medium block">Event Date:</span> {ticket.event.end_date_np}
                                </div>
                                <div className="mt-2">
                                    <span className="font-medium">Numbers:</span> {ticket.number1}, {ticket.number2}, {ticket.number3}, {ticket.number4}, {ticket.number5}, {ticket.number6}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-lg text-gray-500">No tickets found.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Ticket;