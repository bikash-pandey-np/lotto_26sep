import Layout from "../Components/Layout";
import { Inertia } from '@inertiajs/inertia';

import Swal from 'sweetalert2';

const Index = () => {

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Here you can add the logic to log out the user
                // For example, you might want to clear session data or redirect to a login page
                // This is just a placeholder for the actual logout logic
                console.log('User logged out');
                Inertia.post(route('agent.logout'));
            }
        });
    }
    
    return (
        <Layout>
            <div className="mt-4 p-4 mb-12 shadow rounded-lg">
                <h1 className="text-2xl font-bold text-white">More Options</h1>

                <div className="mt-6">
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <a href={route('agent_more_event')} className="text-blue-600 hover:text-blue-700">Events</a>
                        </li>
                        <hr className="my-2 border-t border-gray-200" />
                        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <a href={ route('agent_more_earning_logs') } className="text-blue-600 hover:text-blue-700">Earning Logs</a>
                        </li>
                        <hr className="my-2 border-t border-gray-200" />

                        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <a href={route('agent_more_ticket')} className="text-blue-600 hover:text-blue-700">Tickets</a>
                        </li>
                        <hr className="my-2 border-t border-gray-200" />

                        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                            <a 
                            onClick={handleLogout}
                            className="text-blue-600 hover:text-blue-700">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Index;