import { useState } from "react";
import "./OfferApplicationBox.scss";

export const OfferApplicationBox = ({ onSubmit, isSubmitting }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(message.trim() || null);
  };

  return (
    <form className="offer-application-box" onSubmit={handleSubmit}>
      <label htmlFor="application-message">
        Mensaje para el creador (opcional)
      </label>
      <textarea
        id="application-message"
        className="offer-application-box-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder="Cuéntale por qué te interesa este proyecto o qué experiencia aportas..."
      />
      <button
        type="submit"
        className="offer-application-box-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Inscribirme"}
      </button>
    </form>
  );
};