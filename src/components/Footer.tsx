import "/src/components/Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="contact-banner">
        <div className="info-section">
          <div className="info-column">
            <a href="/terms-and-conditions/" target="_blank">
              About Me
            </a>
            <a href="/refund-policy/" target="_blank">
              Projects
            </a>
            <a href="/privacy-policy/" target="_blank">
              Skills
            </a>
          </div>

          <div className="info-column"></div>

          <div className="info-column">
            <div>
              <a href="https://instagram.com/">
                <img
                  src="../src/assets/instagram-logo.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    verticalAlign: "middle",
                  }}
                  alt="instagram"
                />
                <span style={{ marginLeft: "6px" }}>@naitikchattaraj</span>
              </a>
              <a href="https://www.linkedin.com/in/">
                <img
                  src="../src/assets/linkedin-logo.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    verticalAlign: "middle",
                  }}
                  alt="linkedin"
                />
                <span style={{ marginLeft: "6px" }}>Naitik Chattaraj</span>
              </a>
              <a href="https://www.x.com/">
                <img
                  src="../src/assets/x-logo.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    verticalAlign: "middle",
                  }}
                  alt="facebook"
                />
                <span style={{ marginLeft: "6px" }}>@nchattaraj</span>
              </a>
            </div>
          </div>
        </div>

        <div className="top-row">
          <div className="contact-coloumn">
            <div className="contact-coloumn">
              <div
                className="whatsapp"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap", // optional for small screens
                }}
              >

                
              </div>
            </div>
          </div>

          <p className="copyright">2025 Naitik Chattaraj. All Rights Reserved.</p>
        </div>

        <p className="email">N A I T I K</p>
      </div>
    </footer>
  );
}

export default Footer;
