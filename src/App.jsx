import { useMemo, useState } from 'react';

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 0,
      title: '¡Bienvenido a tu nuevo CRUD!',
      body: '¡Felicidades! Tu aplicación React está lista para crear, editar y eliminar notas.',
      userId: 1,
    },
  ]);

  const [form, setForm] = useState({ id: null, title: '', body: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        String(p.id).includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const resetForm = () => {
    setForm({ id: null, title: '', body: '' });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      userId: 1,
    };

    if (!payload.title || !payload.body) {
      alert('Completa título y contenido.');
      return;
    }

    if (isEditing) {
      // Editar post existente
      setPosts((prev) =>
        prev.map((p) => (p.id === form.id ? { ...p, ...payload } : p))
      );
      resetForm();
    } else {
      // Crear nuevo post
      const newPost = {
        ...payload,
        id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      };
      setPosts((prev) => [newPost, ...prev]);
      resetForm();
    }
  };

  const handleEdit = (post) => {
    setForm({ id: post.id, title: post.title, body: post.body });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const ok = confirm(`Eliminar post #${id}?`);
    if (!ok) return;

    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (form.id === id) resetForm();
  };

  return (
    <div className="container">
      <header>
        <h1>YOICHI - REACT</h1>
      </header>

      <section className="card">
        <h2>{isEditing ? 'Editar post' : 'Crear nuevo post'}</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Ej. Mi primer post"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="field">
            <label htmlFor="body">Contenido</label>
            <textarea
              id="body"
              rows={4}
              placeholder="Escribe aquí..."
              value={form.body}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, body: e.target.value }))
              }
            />
          </div>

          <div className="actions">
            <button type="submit" className="primary">
              {isEditing ? 'Guardar cambios' : 'Crear'}
            </button>

            {isEditing && (
              <button type="button" onClick={resetForm} className="ghost">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <input
          type="search"
          placeholder="Buscar por id, título o contenido..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <span className="count">{filtered.length} resultados</span>

        <section className="grid">
          {filtered.length === 0 ? (
            <p>No hay posts.</p>
          ) : (
            filtered.map((post) => (
              <article key={post.id} className="card item">
                <section className="item-head">
                  <h3>{post.id}</h3>
                  <h3>{post.title}</h3>
                  <div className="item-actions">
                    <button className="ghost" onClick={() => handleEdit(post)}>
                      Editar
                    </button>
                    <button
                      className="danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </section>
                <p>{post.body}</p>
              </article>
            ))
          )}
        </section>
      </section>

      <footer>
        <small className="muted">Hecho por Brenda Quiroz</small>
      </footer>
    </div>
  );
}


        
        
      

