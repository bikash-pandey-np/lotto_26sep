import React, {useEffect} from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = ({phone}) => {

    console.log('phone', phone)
    const {flash} = usePage().props

    const { data, setData, post, processing, errors } = useForm({
        phone: phone,
        otp: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('get_otp_page'))
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
                <h2 className="text-2xl font-bold text-center mb-6">Verify Phone</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Phone No"
                            value={data.phone}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.phone && <div className="text-red-500 mt-2">{errors.phone}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="OTP"
                            value={data.otp}
                            onChange={(e) => setData('otp', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.otp && <div className="text-red-500 mt-2">{errors.otp}</div>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>

              
            </div>
            <ToastContainer />
        </div>
    );
};

export default VerifyOtp;
