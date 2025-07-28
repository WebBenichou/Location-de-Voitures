import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa';


const APropos = () => {
    return (

        <>
            <div className="container py-5 a-propos ">
                {/* Section : À propos */}
                <h1 className="text-center mb-4">À propos de <span className="text-warning">Benichou Lux Car</span></h1>

                <div className="row align-items-center">
                    <div className="col-md-6 mb-4">
                        <img
                            src="images/Car Logo.png"
                            alt="Voiture de luxe"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-md-6 fs-5">
                        <h2>Notre histoire</h2>
                        <p>
                            Fondée en 2010, <strong>Benichou Lux Car</strong> est devenue une référence dans la location
                            de véhicules haut de gamme au Maroc. Notre passion pour l'automobile se
                            reflète dans chaque service que nous proposons.
                        </p>

                        <h2>Nos valeurs</h2>
                        <ul>
                            <li>Excellence et qualité de service</li>
                            <li>Transparence et honnêteté</li>
                            <li>Satisfaction client avant tout</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="bg-black ">
                {/* Section : Comment ça marche */}
                <h1 className="text-warning text-center mb-4 py-5">Comment ça marche</h1>
                <p className="text-center text-light mb-5 fs-5">
                    Les véhicules peuvent être loués pour des périodes courtes ou longues, offrant une solution flexible et pratique pour tous vos besoins de transport.
                    Louer un véhicule peut être une option idéale, que ce soit pour des vacances, un déplacement professionnel, ou une occasion spéciale.
                </p>

                <div className="row mb-5">
                    <div className="col-md-4 mb-4">
                        <div className="p-4 shadow rounded bg-light text-center h-100">
                            <FaMapMarkerAlt size={50} className="text-warning mb-3" />
                            <h4>Choisir un lieu</h4>
                            <p>
                                Nous nous engageons à offrir un service client exceptionnel et des véhicules fiables,
                                disponibles dans divers lieux de prise en charge pour vous simplifier la vie.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="p-4 shadow rounded bg-light text-center h-100">
                            <FaCalendarAlt size={50} className="text-warning mb-3" />
                            <h4>Choisir une date</h4>
                            <p>
                                Choisissez la date et l'heure qui vous conviennent le mieux. Nous assurons une gestion fluide
                                pour commencer votre voyage en toute sérénité.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="p-4 shadow rounded bg-light text-center h-100">
                            <FaCar size={50} className="text-warning mb-3" />
                            <h4>Réserver une voiture</h4>
                            <p>
                                Réservez une voiture en toute simplicité. Compacte, SUV ou luxe, nous avons le véhicule parfait
                                pour vous avec un excellent service client.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default APropos;



