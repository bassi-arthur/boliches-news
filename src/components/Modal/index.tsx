import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import {
  UilMultiply,
  UilClock,
  UilLocationPoint,
  UilUsersAlt,
  UilFavorite,
  UilArrowRight ,
} from "@iconscout/react-unicons";

export default function Modal({ open, onClose, event }) {
  useEffect(() => {});

  if (!open) return null;

  const parseDate = (dateToParse) => {
    return new Date(dateToParse).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseHours = (dateToParse) => {
    return new Date(dateToParse).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div onClick={onClose} className={styles.overlay}>
      <main className={styles.modalContainer}>
        <header className={styles.modalHeader}>
          <h1>{event?.title}</h1>
          <UilMultiply className={styles.closeButton} onClick={onClose} />
        </header>
        <ul className={styles.eventDetails}>
          <li>
            <UilFavorite alt="Especialidade" />
            <p>{event?.highlight}</p>
          </li>
          <li>
            <UilLocationPoint alt="Localização" />
            <p>{event?.location}</p>
          </li>
          <li>
            <UilClock />
            <p className={styles.durationTime}>{parseDate(event?.start)} <UilArrowRight/> {parseHours(event?.end)}</p>
          </li>
          <li>
            <UilUsersAlt />
            <p>{event?.participants.join(", ")}</p>
          </li>
        </ul>
      </main>
    </div>
  );
}
