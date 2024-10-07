import React, { useEffect } from "react";
import "../styles.css";

const Footer = () => {
  useEffect(() => {
    function loadScript() {
      const b = document.getElementsByTagName("head")[0];
      const c = document.createElement("script");
      c.type = "text/javascript";
      c.src = "https://tracker.metricool.com/app/resources/be.js";
      c.onload = () => {
        if (window.beTracker) {
          window.beTracker.t({ hash: "5cc81a9bbfe8e152a3eceab994851ee2" });
        }
      };
      b.appendChild(c);
    }

    loadScript();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <section className="footer-section">
          <h5 className="footer-title">COOTRAESPECIALES</h5>
          <div className="footer-divider"></div>
          <img
            width="243"
            height="89"
            src="https://cootraespeciales.com/sitio/wp-content/uploads/2022/06/LOgo_superTRansporte.png"
            alt="Logo"
            className="footer-logo"
          />
        </section>

        <section className="footer-section">
          <p className="footer-text">
            &copy; Las cookies de este sitio web se usan para personalizar el
            contenido y los anuncios, ofrecer funciones de redes sociales y
            analizar el tráfico. Además, compartimos información sobre el uso
            que haga del sitio web con nuestros partners de redes sociales,
            publicidad y análisis web, quienes pueden combinarla con otra
            información que les haya proporcionado o que hayan recopilado a
            partir del uso que haya hecho de sus servicios. Todo dato personal
            será tratado de acuerdo a nuestra política de protección de datos
            personales. Todos los derechos reservados <b>Cootraespeciales</b>{" "}
            2024 | Diseñado por{" "}
            <a
              href="//andagencia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              AND AGENCIA
            </a>
          </p>
        </section>

        <section className="footer-section contact-section">
          <h5 className="footer-title">Contacto</h5>
          <p>
            Dirección:{" "}
            <a href="Cra. 68a #45 - 5">
            Cra. 68a #45 - 5
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mercadeo@cootraespeciales.com">
            mercadeo@cootraespeciales.com
            </a>
          </p>
          <p>
            Teléfono: <a href="231 80 86 - Ext. 0">231 80 86 - Ext. 0</a>
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
