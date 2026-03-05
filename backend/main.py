from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import matplotlib.pyplot as plt
import io
import base64
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChartSlice(BaseModel):
    label: str
    value: float
    color: str

class ChartRequest(BaseModel):
    title: str
    subtitle: str | None = None
    slices: list[ChartSlice]


@app.post("/generate-chart")
def generate_chart(data: ChartRequest):
    try:
    
        locals = [item.label for item in data.slices]
        valores = [item.value for item in data.slices]
        colors = [item.color for item in data.slices]

        
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


        total = sum(valores)
        if total > 0:
            percents = [v / total * 100 for v in valores]
            rounded_percents = [round(p, 1) for p in percents]

            diff = round(100.0 - sum(rounded_percents), 1)
            if diff != 0:
                max_val = max(valores)
                max_idx = valores.index(max_val)
                rounded_percents[max_idx] = round(rounded_percents[max_idx] + diff, 1)
            
            for i, text in enumerate(autotexts):
                text.set_text(f"{rounded_percents[i]:.1f}%")

        
        for text in autotexts:
            try:
                x, y = text.get_position()
                new_x = x * 0.7  
                new_y = y * 0.7
                
                if "10.0%" in text.get_text():
                    new_y += 0.1
                    new_x += 0.1
                
                text.set_position((new_x, new_y))
            except:
                pass

        plt.setp(autotexts, size=14, weight="bold")

        
        ax.legend(wedges, labels,
                  title="Legenda",
                  loc="upper center",
                  bbox_to_anchor=(0.5, -0.05),
                  fontsize=12,
                  title_fontsize=16)
        
        full_title = data.title
        if data.subtitle:
            full_title += f"\n{data.subtitle}"
            
        ax.set_title(full_title)
        plt.tight_layout()

        
        buf = io.BytesIO()
        plt.savefig(buf, format='jpg', bbox_inches='tight', dpi=150)
        buf.seek(0)
        plt.close(fig)

        
        img_str = base64.b64encode(buf.read()).decode('utf-8')
        
        return {"image_base64": f"data:image/png;base64,{img_str}"}

    except Exception as e:
        print(f"Erro no servidor: {e}")
        return {"error": str(e)}


