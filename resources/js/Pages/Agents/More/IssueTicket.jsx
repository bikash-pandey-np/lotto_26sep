import Layout from "../Components/Layout";
import { useForm } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { FaHistory } from "react-icons/fa";
import Swal from 'sweetalert2';

const IssueTicket = ({balance, states, districts, local_bodies, events}) => {
    const { data, setData, post, processing, errors } = useForm({
        event_id: '',
        fullname: 'asd',
        phone_no: '9818212312',
        state_id: '',
        district_id: '',
        local_body_id: '',
        ward: '10',
        number1: '10',
        number2: '10',
        number3: '10',
        number4: '10',
        number5: '10',
        number6: '10',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the selected event
        const selectedEvent = events.find(event => event.id === parseInt(data.event_id));
        
        // Get the ticket price if an event is selected
        const ticketPrice = selectedEvent ? selectedEvent.ticket_price : 0;

       
        console.log('FormData is ', data);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will be charged Npr "+ticketPrice + " for this ticket",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Issue Ticket!'
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('agent_more_issue_ticket'), {
                    onSuccess: () => {
                        setData({
                            event_id: '',
                            fullname: '',
                            phone_no: '',
                            state_id: '',
                            district_id: '',
                            local_body_id: '',
                            ward: '',
                            number1: '',
                            number2: '',
                            number3: '',
                            number4: '',
                            number5: '',
                            number6: '',
                        });
                    }
                });
            }
        });
    };

    const renderNumberInput = (number) => (
        <div className="mb-4" key={`number${number}`}>
            <label className="block text-sm font-medium text-gray-300" htmlFor={`number${number}`}>{`${number}${getOrdinal(number)} Number`}</label>
            <input
                type="number"
                id={`number${number}`}
                placeholder={`Enter ${number}${getOrdinal(number)} number`}
                value={data[`number${number}`]}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 100)) {
                        setData(`number${number}`, value);
                    }
                }}
                className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                min="1"
                max="100"
                required
            />
            {errors[`number${number}`] && <div className="text-red-500 mt-2">{errors[`number${number}`]}</div>}
        </div>
    );

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <Layout>
            <div className="mt-4 p-4">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Issue Ticket</h1>
                        <p className="mt-2">Balance: <span className="font-bold">Npr {balance}</span></p>
                    </div>
                    <div>
                        <Link href={route('agent_more_ticket')} className="text-green-600 inline-block p-2 border border-green-600 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                            <FaHistory />
                        </Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 mb-16">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="fullname">Ticket Owner Fullname</label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter fullname"
                            value={data.fullname}
                            onChange={(e) => setData('fullname', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                        {errors.fullname && <div className="text-red-500 mt-2">{errors.fullname}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="phone_no">Phone Number</label>
                        <input
                            type="tel"
                            id="phone_no"
                            placeholder="Enter phone number"
                            value={data.phone_no}
                            onChange={(e) => setData('phone_no', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                        {errors.phone_no && <div className="text-red-500 mt-2">{errors.phone_no}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="event_id">Event</label>
                        <select
                            id="event_id"
                            value={data.event_id}
                            onChange={(e) => setData('event_id', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        >
                            <option value="">Select Event</option>
                            {events.map(event => (
                                <option
                                ticket_price={event.ticket_price}
                                     key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        {errors.event_id && <div className="text-red-500 mt-2">{errors.event_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="state_id">State</label>
                        <select
                            id="state_id"
                            value={data.state_id}
                            onChange={(e) => setData('state_id', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </select>
                        {errors.state_id && <div className="text-red-500 mt-2">{errors.state_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="district_id">District</label>
                        <select
                            id="district_id"
                            value={data.district_id}
                            onChange={(e) => setData('district_id', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                        {errors.district_id && <div className="text-red-500 mt-2">{errors.district_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="local_body_id">Local Body</label>
                        <select
                            id="local_body_id"
                            value={data.local_body_id}
                            onChange={(e) => setData('local_body_id', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        >
                            <option value="">Select Local Body</option>
                            {local_bodies.map(local_body => (
                                <option key={local_body.id} value={local_body.id}>{local_body.name}</option>
                            ))}
                        </select>
                        {errors.local_body_id && <div className="text-red-500 mt-2">{errors.local_body_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="ward">Ward</label>
                        <input
                            type="number"
                            id="ward"
                            placeholder="Enter ward number"
                            value={data.ward}
                            onChange={(e) => setData('ward', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                        {errors.ward && <div className="text-red-500 mt-2">{errors.ward}</div>}
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-300 mb-2">Choose 6 numbers (1-100)</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(number => renderNumberInput(number))}
                        </div>
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={processing}>
                        {processing ? 'Issuing Ticket...' : 'Issue Ticket'}
                    </button>
                    <button type="reset"
                     className="mt-2 ml-4 px-4 py-2 bg-yellow-600 text-white rounded"
                     onClick={() => {
                        setData({
                            event_id: '',
                            fullname: '',
                            phone_no: '',
                            state_id: '',
                            district_id: '',
                            local_body_id: '',
                            ward: '',
                            number1: '',
                            number2: '',
                            number3: '',
                            number4: '',
                            number5: '',
                            number6: '',
                        });
                    }}>
                        Reset
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default IssueTicket;
