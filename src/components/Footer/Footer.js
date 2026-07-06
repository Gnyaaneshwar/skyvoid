import "./Footer.css";

function Footer() {
  return (
    <footer className="footer glass">
      <div className="footer-content">
        <p className="footer-brand">
          <strong>SKYVOID</strong> Weather Intelligence
        </p>
        <p className="footer-center">
          Built with React & OpenWeather API
        </p>
        <p className="footer-right">
          Developed by Gnyaanesh
        </p>
      </div>
    </footer>
  );
}

export default Footer;