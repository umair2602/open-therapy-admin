import mongoose from "mongoose";

const AssociatedProblemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  descricao: { type: String, required: true },
  tags: { type: [String], required: true },
  nivel_risco: { type: String, required: true },
  sugestao_ia: { type: String, required: false },
});

const LifeAreaPromptSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    area_vida: { type: String, required: true },
    nome_publico: { type: String, required: true },
    tag: { type: String, required: true },
    clima: { type: String, required: true },
    modelo: { type: String, required: true },
    tom: { type: String, required: true },
    objetivo: { type: String, required: true },
    sugestao_ia: { type: String, required: true },
    nivel_prioridade: { type: String, required: true },
    idioma: { type: String, required: true },
    mensagem_base: { type: String, required: true },
    problemas_associados: { type: [AssociatedProblemSchema], default: [] },
    perguntas: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("LifeAreaPrompt", LifeAreaPromptSchema);
