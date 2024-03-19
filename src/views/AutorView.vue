<script setup>
import { ref, reactive, onMounted } from "vue";
import AutorApi from "@/api/autor";
const autorApi = new AutorApi();

const defaultAutor = { id: null, nome: "", email: "" };
const autores = ref([]);
const autor = reactive({ ...defaultAutor });

onMounted(async () => {
  autores.value = await autorApi.buscarTodasOsAutor();
});

function limpar() {
  Object.assign(autor, { ...defaultAutor });
}

async function salvar() {
  if (autor.id) {
    await autorApi.atualizarAutor(autor);
  } else {
    await autorApi.adicionarAutor(autor);
  }
  autores.value = await autorApi.buscarTodasOsAutor();
  limpar();
}

function editar(autor_para_editar) {
  Object.assign(autor, autor_para_editar);
}

async function excluir(id) {
  await autorApi.excluirAutor(id);
  autores.value = await autorApi.buscarTodasOsAutor();
  limpar();
}
</script>

<template>
  <h1>Autor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="autor.nome" placeholder="Nome" />
    <input type="text" v-model="autor.email" placeholder="email" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="autor in autores" :key="autor.id">
      <span @click="editar(autor)">
        ({{ autor.id }}) - {{ autor.nome }} - {{ autor.site }} -
      </span>
      <button @click="excluir(autor.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
