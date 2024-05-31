"use client"
import { motion } from "framer-motion"
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const ContactPage = () => {

const [success,setSuccess] = useState(false);
const [error,setError] = useState(false);
const text = "Hi there! :)";

const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, 
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      })
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        }
      );
  };

 return (
    <motion.div className="h-full overflow-scroll lg:overflow-hidden xl:overflow-hidden" initial={{y:"-200vh"}} animate={{y:"0%"}} transition={{duration:1}}>
    <div className="h-screen flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="py-10 lg:w-1/2 flex items-center justify-center text-white text-3xl lg:text-6xl xl:text-6xl">
            <div className="">{text.split("").map((letter, index)=>(
                <motion.span key={index} initial={{opacity:1}} animate={{opacity:0}} transition={{duration:3, repeat:Infinity, delay:index*0.1}}>{letter}</motion.span>
            ))}</div>
        </div>
        {/* FORM CONTAINER */}
        <form
            onSubmit={sendEmail} 
            ref={form} className="h-[75%] w-[90%] pb-10 bg-borgonia rounded-xl text-neonYellow font-bold text-lg md:text-xl flex flex-col gap-6 justify-center p-10 sm:p-18 md:p-19 lg:px-20 lg:py-15">
            <span className="">Dear Karen,</span>
            <textarea rows={10} className="bg-transparent border-b-2 border-b-black outline-none resize-none min-h-[2rem]"
            name="user_message"
            />
            <span>My mail adress is:</span>
            <input name="user_email" type="text" className="bg-transparent border-b-2 border-b-black outline-none" />
            <span>Regards.</span>
            <button className="bg-purple-200 rounded font-semibold text-gray-600 p-4">Send</button>
            {success && <span className="text-green-600 font-semibold">Your message has been sent succesfully!</span>}
            {error && <span className="text-red-600 font-semibold">Something went wrong!</span>}
        </form>
    </div>
    </motion.div>
)
}

export default ContactPage