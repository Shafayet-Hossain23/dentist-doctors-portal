import { DayPicker } from 'react-day-picker';
import img from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'


const Calender = ({ selectedDate, setSelectedDate }) => {

    return (
        <div className='my-14 mx-3'>
            <div style={{ backgroundImage: `url(${bg})` }} className='flex justify-between  flex-col-reverse lg:flex-row '>
                <div className='lg:ml-28 ml-14 mt-7 lg:mt-0'>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={(data) => {
                            if (data) {
                                setSelectedDate(data)
                            }
                        }}
                    />
                </div>
                <div className='lg:w-1/2 w-full' >
                    <img src={img} alt="" />
                </div>
            </div>
            {/* <p>You Picked {format(selectedDate, 'PP')}.</p> */}
        </div>

    );
};

export default Calender;