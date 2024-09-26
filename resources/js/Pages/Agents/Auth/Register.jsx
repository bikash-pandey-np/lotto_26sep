import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        password: '',
        refer_code: ''
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    };
   
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center mb-4 mt-8">
                <img src={logo} alt="Logo" className="h-8" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Register an Account</h2>
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

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Refferal Code"
                        value={data.refer_code}
                        onChange={(e) => setData('refer_code', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.refer_code && <div className="text-red-500 mt-2">{errors.refer_code}</div>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={processing || !agree}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Register
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <a href='' className="text-blue-600 hover:underline">Login here</a>
            </div>
        </div>
    );
};

export default Register;
