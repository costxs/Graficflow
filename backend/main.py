from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import matplotlib.pyplot as plt
import io
import base64

# Inicializa a API
app = FastAPI()

# Configuração de CORS (Permite que seu React acesse este Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, troque "*" pelo domínio do seu site
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos de Dados (Contrato com o Frontend) ---
class ChartSlice(BaseModel):
    label: str
    value: float
    color: str

class ChartRequest(BaseModel):
    title: str
    subtitle: str | None = None
    slices: list[ChartSlice]

# --- Rota de Geração ---
@app.post("/generate-chart")
def generate_chart(data: ChartRequest):
    try:
        # Extrair dados recebidos
        labels = [item.label for item in data.slices]
        valores = [item.value for item in data.slices]
        colors = [item.color for item in data.slices]

        # Configuração do Matplotlib
        plt.style.use('ggplot')
        fig, ax = plt.subplots(figsize=(10, 8))

        wedges, texts, autotexts = ax.pie(
            valores,
            labels=None,
            autopct='%1.1f%%',
            startangle=90,
            colors=colors,
            pctdistance=0.85,
            shadow=False
        )

        # --- LÓGICA DE CORREÇÃO DE PORCENTAGEM (Seu código original) ---
        total = sum(valores)
        if total > 0:
            percents = [v / total * 100 for v in valores]
            rounded_percents = [round(p, 1) for p in percents]
            
            # Verificar soma 100%
            diff = round(100.0 - sum(rounded_percents), 1)
            if diff != 0:
                max_val = max(valores)
                max_idx = valores.index(max_val)
                rounded_percents[max_idx] = round(rounded_percents[max_idx] + diff, 1)
            
            # Atualizar textos
            for i, text in enumerate(autotexts):
                text.set_text(f"{rounded_percents[i]:.1f}%")

        # --- AJUSTE FINO DE POSIÇÃO (Seu código original) ---
        for text in autotexts:
            try:
                x, y = text.get_position()
                new_x = x * 0.7  # Trazendo mais para o centro
                new_y = y * 0.7
                
                if "10.0%" in text.get_text():
                    new_y += 0.1
                    new_x += 0.1
                
                text.set_position((new_x, new_y))
            except:
                pass

        plt.setp(autotexts, size=14, weight="bold")

        # Legenda
        # Legenda
        ax.legend(wedges, labels,
                  title="Legenda",
                  loc="upper center",
                  bbox_to_anchor=(0.5, -0.05),
                  fontsize=12,
                  title_fontsize=14)
        
        full_title = data.title
        if data.subtitle:
            full_title += f"\n{data.subtitle}"
            
        ax.set_title(full_title)
        plt.tight_layout()

        # Salvar em memória (Buffer)
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', dpi=150)
        buf.seek(0)
        plt.close(fig)

        # Converter para Base64
        img_str = base64.b64encode(buf.read()).decode('utf-8')
        
        return {"image_base64": f"data:image/png;base64,{img_str}"}

    except Exception as e:
        print(f"Erro no servidor: {e}")
        return {"error": str(e)}

# Para rodar: uvicorn main:app --reload
