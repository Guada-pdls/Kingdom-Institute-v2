import { Helmet } from 'react-helmet';
import './Gallery.css'

const Gallery = () => {
  const images = [
    { src: "/images/gallery/end-of-course-farewell.jpg", alt: "Despedida del año" },
    { src: "/images/gallery/approved-students.jpg", alt: "Alumnas con certificado de exámen de Cambridge aprobado" },
    { src: "/images/gallery/audeppi-delivery.jpg", alt: "Entrega de premios de Audeppi" },
    { src: "/images/gallery/approved-student.jpg", alt: "Alumna con certificado de exámen de Cambridge aprobado" },
    { src: "/images/gallery/fce.jpg", alt: "Alumnos del grupo FCE" },
    { src: "/images/gallery/approved-student-2.jpg", alt: "Alumna con certificado de exámen de Cambridge aprobado" },
    { src: "/images/gallery/at5.jpg", alt: "Alumnos del grupo AT5" },
    { src: "/images/gallery/pre-fce.jpg", alt: "Alumnos del grupo Pre-FCE" },
    { src: "/images/gallery/students-with-actors.jpg", alt: "Alumnos con actores de la obra" },
    { src: "/images/gallery/birthday.jpg", alt: "Festejando un cumpleaños juntos" },
    { src: "/images/gallery/educational-outing.jpg", alt: "Alumnos en salida didáctica" },
  ];

  return (
    <>
      <Helmet>
        <title>Galería - Kingdom Institute</title>
        <meta name="description" content="Galería de fotos del instituto." />
        <meta name="keywords" content="cursos de ingles, inglés, inglés para niños, clases de inglés, inglés personalizado, examenes de inglés, preparacion de examenes" />
        <meta property="og:title" content="Galería - Kingdom Institute" />
        <meta property="og:description" content="Descubre nuestros eventos y clases a través de nuestra galería de fotos." />
        <meta property="og:image" content="/images/gallery-image.jpg" />
      </Helmet>
      <section className="gallery">
        {images.map((image, index) => (
          <picture className={index % 2 == 0 ? "item horizontal" : "item vertical"} key={index} data-aos="fade-up">
            <img src={image.src} alt={image.alt} className="photo" />
          </picture>
        ))}
      </section>
    </>
  )
}

export default Gallery