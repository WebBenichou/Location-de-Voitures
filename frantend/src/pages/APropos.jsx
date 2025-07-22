import React from 'react';
 

const APropos = () => {
    return (
        <div className="container py-5 a-propos">
            <h1 className="text-center mb-4">À propos de <span className="text-primary">Benichou Lux Car</span></h1>
            
            <div className="row align-items-center">
                <div className="col-md-6 mb-4">
                    <img 
                        src="/images/Lux-Car.jpg" 
                        alt="Voiture de luxe" 
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2>Notre histoire</h2>
                    <p>
                        Fondée en 2010, <strong>Benichou Lux Car</strong> est devenue une référence dans la location
                        de véhicules haut de gamme au Maroc. Notre passion pour l'automobile se
                        reflète dans chaque service que nous proposons.
                    </p>

                    <h2>Nos valeurs</h2>
                    <ul>
                        <li> Excellence et qualité de service</li>
                        <li> Transparence et honnêteté</li>
                        <li> Satisfaction client avant tout</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default APropos;
