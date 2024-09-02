import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { inserDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const { createUser, error, loading } = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //valida url da imagem
    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL.");
    }

    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    const set = new Set(tagsArray);
    if (set.size !== tagsArray.length) {
      return setFormError("Por favor, insira tags únicas.");
    }
    

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    } 
    
    inserDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
    
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insira uma image que represente seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && (
          <button type="submit" className="btn">
            Cadastrar
          </button>
        )}
        {response.loading && (
          <button disabled type="submit" className="btn">
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
