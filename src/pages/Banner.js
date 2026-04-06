export default function Banner({ 
  title = "",
  description = "",
  buttonText = "",
  buttonLink = ""
}) {
  return (
    <section id="home-slider">
      <div className="slider-wrap">

        <div className="text">
          <h1>{title}</h1>

          <p>{description}</p>

          <div className="buttons">
            <div className="default_btn">
              <a href={buttonLink}>{buttonText}</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
