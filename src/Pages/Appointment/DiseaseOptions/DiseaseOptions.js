import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Loading from '../../../Components/Loading';
import BookingModal from '../BookingModal/BookingModal';
import DiseaseOption from './DiseaseOption';

const DiseaseOptions = ({ selectedDate }) => {
    // const [options, setOptions] = useState([])
    const [treatment, setTreatment] = useState('')
    const date = format(selectedDate, "PP")

    const { data: options = [], refetch, isLoading } = useQuery({
        queryKey: ['appoinmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-sand.vercel.app/appoinmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    /* const { data: options = [] } = useQuery({
        queryKey: ['appoinmentOptions'],
        queryFn: () => fetch('https://doctors-portal-server-sand.vercel.app/appoinmentOptions')
            .then(res => res.json())

    }) */
    /* useEffect(() => {
        fetch('https://doctors-portal-server-sand.vercel.app/appoinmentOptions')
            .then(res => res.json())
            .then(data => setOptions(data))
    }, []) */
    // console.log(options)
    // console.log(treatment)
    return (
        <div className='mb-10'>
            <div className='text-primary font-bold text-center mb-3'>Available Appointments on {format(selectedDate, 'PP')}.</div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 mx-4 mt-4'>
                {
                    options.map(data => <DiseaseOption
                        key={data._id}
                        data={data}
                        setTreatment={setTreatment}
                    >
                    </DiseaseOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
            <Toaster />
        </div>
    );
};

export default DiseaseOptions;