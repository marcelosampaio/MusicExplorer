import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  return (
    <div>
      <h2>Detalhes da Música/Álbum</h2>
      <p>ID selecionado: {id}</p>
    </div>
  );
}

export default Details;
