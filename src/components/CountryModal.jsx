import React, { useState, useEffect } from "react";
import { Modal, Skeleton } from "antd";
import styles from "../styles/CountryModal.module.css";
import Image from "next/image";

export default function CountryModal({ country, onClose }) {
    const [loading, setLoading] = useState(true);

useEffect(() => {
    if (country) {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); 
    }
}, [country]);

if (!country) {
    return null;
}

return (
    <Modal
        title={`Detalhes de ${country.translations.por.common}`}
        open={!!country}
        onCancel={onClose}
        footer={null}
    >
        {loading ? (
        <div className={styles.skeletonContainer}>
            <Skeleton active paragraph={{ rows: 4 }} />
        </div>
    ) : (
        <div className={styles.modalContent}>
        <h2>{country.translations.por.common}</h2>
        <Image
            src={country.flags?.png || "/placeholder.png"}
            alt={`Bandeira de ${country.translations?.por?.common || "Desconhecido"}`}
            width={150}
            height={100}
            className={styles.image} // Adiciona a classe para estilizar a imagem
        />
        <p><span>Nome Oficial:</span> {country.translations.por.official}</p>
        <p><span>Capital:</span> {country.capital || "Não tem"}</p>
        <p><span>Continente:</span> {country.region}</p>
        <p><span>Sub-região:</span> {country.subregion || "Não tem"}</p>
        <p><span>População:</span> {country.population.toLocaleString()}</p>
        <p><span>Fuso Horário:</span> {country.timezones[0]}</p>
    </div>
    )}
    </Modal>
    );
}