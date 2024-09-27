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
            <div className="mt-4 p-4 mb-12">
                <h1 className="text-2xl font-bold">More Options</h1>

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
                    <li>
                        <a 
                        onClick={handleLogout}
                        className="text-blue-600 hover:underline">Logout</a>
                    </li>
                </ul>
            </div>
            </div>
        </Layout>
    );
};

export default Index;