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
                        <button type="submit" className="btn btn-primary">Envoyer</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>Coordonnées</h2>
                    <p>
                        <strong>Adresse:</strong> 123 Avenue des Champs-Élysées, 75008 Paris
                    </p>
                    <p>
                        <strong>Téléphone:</strong> 01 23 45 67 89
                    </p>
                    <p>
                        <strong>Email:</strong> contact@benichouluxcar.com
                    </p>
                    <div className="mt-4">
                        <iframe
                            title="Localisation"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674389!3d48.858370079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623258136843!5m2!1sfr!2sfr"
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