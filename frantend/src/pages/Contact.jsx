import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici vous ajouteriez la logique pour envoyer le formulaire
        console.log('Formulaire envoyé:', formData);
        alert('Merci pour votre message! Nous vous contacterons bientôt.');
    };

    return (
        <div className="contact">
            <h1>Contactez-nous</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom complet</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-warning">Envoyer</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>Coordonnées</h2>
                    <p>
                        <strong>Adresse:</strong> Nahda 45, 22000 Azilal, Maroc
                    </p>
                    <p>
                        <strong>Téléphone:</strong>06 02 39 35 64 
                    </p>
                    <p>
                        <strong>Email:</strong> contact@benichouluxcar.com
                    </p>
                    <div className="mt-4">
                        <iframe
                            title="Localisation"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355.80253853536783!2d-6.56697305780484!3d31.96135022113556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda49b00746240c5%3A0x71e831d9c359307f!2z2YXZhti12Kkg2KfZhNi02KjYp9ioINij2LLZitmE2KfZhA!5e0!3m2!1sfr!2sma!4v1753105188999!5m2!1sfr!2sma"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;