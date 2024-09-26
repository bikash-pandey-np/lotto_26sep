import React, {useEffect} from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const {flash} = usePage().props

    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('agent.login'));
    };
   
    useEffect(() => {
        if(flash.success)
        {
            toast.dismiss();
            toast.success(flash.success)
        }

        if(flash.error)
        {
            toast.dismiss();
            toast.error(flash.error)
        }
    }, [flash]);
   
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4 mt-8">
                    {/* <img src={logo} alt="Logo" className="h-8" /> */}
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Phone No"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.phone && <div className="text-red-500 mt-2">{errors.phone}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <a href='' className="text-blue-600 hover:underline">Register </a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
