import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Phone, Mail, MapPin, Instagram } from "lucide-react";

const API = "/api";

const initial = {
    name: "",
    phone: "",
    email: "",
    event_type: "Wedding",
    event_date: "",
    message: "",
};

const eventTypes = [
    "Wedding",
    "Pre-Wedding",
    "Birthday",
    "Cinematic Shoot",
    "Drone Shoot",
    "Destination Wedding",
    "Roka / Small Function",
];

export default function Contact() {
    const [form, setForm] = useState(initial);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.event_type) {
            toast.error("Please share your name, phone, and event type.");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API}/inquiries`, form);
            toast.success("Thank you — we'll reach out within 24 hours.");
            setForm(initial);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please WhatsApp us instead.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="py-24 md:py-32 lg:py-40 bg-[#FDFBF7]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Left column */}
                <div className="lg:col-span-5">
                    <span className="overline">Let's Talk</span>
                    <h2
                        data-testid="contact-title"
                        className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] mt-4 leading-[1.05]"
                    >
                        Tell us your
                        <br />
                        <em className="italic text-[#C88775]">story</em>.
                    </h2>
                    <p className="mt-6 text-[#595553] text-base md:text-lg font-light leading-relaxed">
                        Share a few details and we'll get back within 24 hours with
                        availability, ideas, and a tailored quote.
                    </p>

                    <div className="mt-10 space-y-5">
                        <a
                            href="tel:+919876543210"
                            data-testid="contact-phone"
                            className="flex items-center gap-4 group"
                        >
                            <Phone size={18} className="text-[#C88775]" />
                            <div >
                                <span className="overline">Call</span>
                                <p className="text-[#2C2A29] font-body group-hover:text-[#C88775] transition-colors">
                                    + 91 7206785837
                                </p>
                            </div>
                        </a>
                        <a
                            href="mailto:hello@gerafilms.in"
                            data-testid="contact-email"
                            className="flex items-center gap-4 group"
                        >
                            <Mail size={18} className="text-[#C88775]" />
                            <div >
                                <span className="overline">Email</span>
                                <p className="text-[#2C2A29] font-body group-hover:text-[#C88775] transition-colors">
                                    geraphotography5@gmail.com
                                </p>
                            </div>
                        </a>
                        <a
                            href="https://www.instagram.com/gera_films_ladwa/"
                            target="_blank"
                            rel="noreferrer"
                            data-testid="contact-instagram"
                            className="flex items-center gap-4 group"
                        >
                            <Instagram size={18} className="text-[#C88775]" />
                            <div >
                                <span className="overline">Instagram</span>
                                <p className="text-[#2C2A29] font-body group-hover:text-[#C88775] transition-colors">
                                    @gerafilms
                                </p>
                            </div>
                        </a>
                        <div className="flex items-center gap-4">
                            <MapPin size={18} className="text-[#C88775]" />
                            <div >
                                <span className="overline">Studio</span>
                                <p className="text-[#2C2A29] font-body">
                                    12, Indri Road, Ladwa, Haryana 132041
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    data-testid="inquiry-form"
                    className="lg:col-span-7 bg-[#F5F2EB] p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <label className="block">
                            <span className="overline">Full name</span>
                            <input
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                className="gf-input mt-2"
                                placeholder="Your name"
                                data-testid="input-name"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="overline">Phone</span>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                className="gf-input mt-2"
                                placeholder="Enter your phone number"
                                data-testid="input-phone"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="overline">Email</span>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="gf-input mt-2"
                                placeholder="you@email.com"
                                data-testid="input-email"
                            />
                        </label>
                        <label className="block">
                            <span className="overline">Event date</span>
                            <input
                                name="event_date"
                                type="date"
                                value={form.event_date}
                                onChange={handleChange}
                                className="gf-input mt-2"
                                data-testid="input-date"
                            />
                        </label>
                        <label className="block md:col-span-2">
                            <span className="overline">What's the occasion?</span>
                            <select
                                name="event_type"
                                value={form.event_type}
                                onChange={handleChange}
                                className="gf-input mt-2 bg-transparent"
                                data-testid="input-event-type"
                            >
                                {
                                    eventTypes.map((e) => (
                                        <option key={e} value={e}>
                                            {e}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className="block md:col-span-2">
                            <span className="overline">Tell us more</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                className="gf-input mt-2 resize-none"
                                placeholder="Venue, number of days, anything special..."
                                data-testid="input-message"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="submit-inquiry-btn"
                        className="gf-btn-primary mt-10 disabled:opacity-50"
                    >
                        {
                            loading ? "Sending…" : "Send Inquiry"} <ArrowRight size={14} />
                    </button>
                </form>
            </div>
        </section>
    );
}
