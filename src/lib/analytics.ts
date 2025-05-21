import * as amplitude from "@amplitude/analytics-browser";

const ANALYTICS_CONFIG = {
  DEBOUNCE_TIME: 3000, // Tempo mínimo (em ms) entre eventos iguais
  DEFAULT_USER_ID: "USER_PH",
} as const;

class Analytics {
  private userId: string = ANALYTICS_CONFIG.DEFAULT_USER_ID;
  private eventCache = new Map<string, number>();

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
        if (!apiKey) {
          throw new Error("NEXT_PUBLIC_AMPLITUDE_API_KEY não está definida");
        }

        amplitude.init(apiKey, {
          defaultTracking: {
            attribution: true,
            pageViews: false,
            fileDownloads: true,
            formInteractions: true,
            sessions: true,
          },
          userId: this.userId,
        });
        console.log("Analytics inicializado com sucesso");
      } catch (error) {
        console.error("[Analytics] Erro na inicialização:", error);
      }
    }
  }

  private getCacheKey(name: string, data?: Record<string, unknown>): string {
    if (!data) return name;

    const identifiers = Object.entries(data)
      .filter(([key, value]) => key.includes("Id") && value)
      .map(([key, value]) => `${key}:${value}`)
      .join("_");

    return identifiers ? `${name}_${identifiers}` : name;
  }

  private shouldTrackEvent(
    name: string,
    data?: Record<string, unknown>,
  ): boolean {
    const now = Date.now();
    const key = this.getCacheKey(name, data);
    const lastTracked = this.eventCache.get(key);

    if (lastTracked && now - lastTracked < ANALYTICS_CONFIG.DEBOUNCE_TIME) {
      return false;
    }

    this.eventCache.set(key, now);
    return true;
  }

  setUser(id: number) {
    if (!id) return;
    this.userId = `USER_${id}`;
    amplitude.setUserId(this.userId);
  }

  rastrearEventoAmplitude(name: string, data?: Record<string, unknown>) {
    if (typeof window === "undefined") return;

    try {
      if (!name) {
        console.warn("[Analytics] Nome do evento é obrigatório");
        return;
      }

      if (!this.shouldTrackEvent(name, data)) {
        return;
      }

      const eventData = {
        ...data,
        user_id: this.userId,
        timestamp: Date.now(),
        pathname: window.location.pathname,
      };

      amplitude.track(name, eventData);
      console.log("Evento enviado com sucesso:", name, eventData);
    } catch (error) {
      console.error("[Analytics] Erro ao enviar evento:", {
        erro: error instanceof Error ? error.message : "Erro desconhecido",
        evento: name,
        dados: data,
      });
    }
  }
}

export const analytics = new Analytics();
