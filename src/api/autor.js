import axios from "axios";
export default class AutorApi {
  async buscarTodasOsAutor() {
    const { data } = await axios.get("/autor/");
    return data.results;
  }
  async adicionarAutor(autor) {
    const { data } = await axios.post("/autor/", autor);
    return data.results;
  }
  async atualizarAutor(autor) {
    const { data } = await axios.put(`/autor/${autor.id}/`, autor);
    return data.results;
  }
  async excluirAutor(id) {
    const { data } = await axios.delete(`/autor/${id}/`);
    return data.results;
  }
}
