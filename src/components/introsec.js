export default function IntroSec({
  title_intro      = "",
  description_intor = "",
  buttonLink_intor  = "https://app.grolinq.com",
  buttonText_intor  = "Get Started",
  intor_img         = "",
  subtitle          = "About Us",
}) {
  return (
    <section className="intro_sec">
      <div className="container">
        <div className="row">

          <div className="col-md-6">
            {subtitle && <span className="intro-subtitle">{subtitle}</span>}
            <h2>{title_intro}</h2>
            <p>{description_intor}</p>
            <div className="default_btn">
              <a href={buttonLink_intor} target="_blank" rel="noopener noreferrer">
                {buttonText_intor}
              </a>
            </div>
          </div>

          <div className="col-md-6">
            <div className="img">
              {intor_img && (
                <img
                  src={intor_img}
                  alt={title_intro}
                  className="img-responsive"
                  onError={e => { e.target.style.display = "none"; }}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
