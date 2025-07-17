import React from 'react';

const APropos = () => {
    return (
        <div className="a-propos">
            <h1>À propos de Benichou Lux Car</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Notre histoire</h2>
                    <p>
                        Fondée en 2010, Benichou Lux Car est devenue une référence dans la location
                        de véhicules haut de gamme en France. Notre passion pour l'automobile se
                        reflète dans chaque service que nous proposons.
                    </p>
                </div>
                <div className="col-md-6">
                    <h2>Nos valeurs</h2>
                    <ul>
                        <li>Excellence et qualité de service</li>
                        <li>Transparence et honnêteté</li>
                        <li>Satisfaction client avant tout</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default APropos;