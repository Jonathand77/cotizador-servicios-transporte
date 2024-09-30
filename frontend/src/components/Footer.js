import React, { useEffect } from 'react';
import '../styles.css';

const Footer = () => {
  useEffect(() => {
    function loadScript() {
      const b = document.getElementsByTagName("head")[0];
      const c = document.createElement("script");
      c.type = "text/javascript";
      c.src = "https://tracker.metricool.com/app/resources/be.js";
      c.onload = () => {
        if (window.beTracker) {
          window.beTracker.t({ hash: '5cc81a9bbfe8e152a3eceab994851ee2' });
        }
      };
      b.appendChild(c);
    }
    
    loadScript();
  }, []);

  return (
    <footer>
      <div className="elementor-inner">
        <section className="elementor-section elementor-inner-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default">
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h5 className="elementor-heading-title elementor-size-default">COOTRAESPECIALES</h5>
                  </div>
                </div>
                <div className="elementor-element elementor-widget-divider--view-line elementor-widget">
                  <div className="elementor-widget-container">
                    <div className="elementor-divider">
                      <span className="elementor-divider-separator"></span>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-widget elementor-widget-image">
                  <div className="elementor-widget-container">
                    <img
                      width="243"
                      height="89"
                      src="https://cootraespeciales.com/sitio/wp-content/uploads/2022/06/LOgo_superTRansporte.png"
                      alt=""
                      className="attachment-large size-large wp-image-92"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-inner-section elementor-element elementor-section-boxed elementor-section-height-default">
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-inner-column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-widget elementor-widget-text-editor">
                  <div className="elementor-widget-container">
                    <p>
                      &copy; Las cookies de este sitio web se usan para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar el tráfico. Además, compartimos información sobre el uso que haga del sitio web con nuestros partners de redes sociales, publicidad y análisis web, quienes pueden combinarla con otra información que les haya proporcionado o que hayan recopilado a partir del uso que haya hecho de sus servicios. Todo dato personal será tratado de acuerdo a nuestra política de protección de datos personales.
                      Todos los derechos reservados <b>Cotraespeciales</b> 2024 | Diseñado por <a href="//andagencia.com" target="_blank" rel="noopener noreferrer">AND AGENCIA</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;