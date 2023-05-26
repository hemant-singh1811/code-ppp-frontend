import React from 'react'

export default function Document() {
    return (
        <div className=" h-full w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d112024.35163527941!2d77.12594211320507!3d28.666874385824364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!3e2!4m4!1s0x390d0479faca503b%3A0xd0891be11405e994!3m2!1d28.6822369!2d77.0442927!4m5!1s0x390ce5336becb191%3A0xa89caf8bfb9e7068!2sPlot%20No.%20A%2C%20iThum-Noida%2C%2040%2C%20Block%20A%2C%20Industrial%20Area%2C%20Sector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201301!3m2!1d28.6270614!2d77.3723967!5e0!3m2!1sen!2sin!4v1670522051548!5m2!1sen!2sin"
                width={"100%"}
                height={"100%"}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}
