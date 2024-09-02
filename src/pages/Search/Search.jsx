import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocumnts";
import { useQuery } from "../../hooks/useQuery";

import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Search</h1>

      <div>
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Nenhum post foi encontrado a partir da sua busca...</p>
            <Link className="btn btn-dark" to="/">Voltar</Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default Search;
