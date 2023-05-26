import React from 'react'

export default function Location() {
    return (
        <div className="h-full w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0899505115217!2d77.3698217758123!3d28.627066084328412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5336becb191%3A0xa89caf8bfb9e7068!2siThum-Noida!5e0!3m2!1sen!2sin!4v1670521820029!5m2!1sen!2sin"
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
