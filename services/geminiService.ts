import { GoogleGenAI, Chat } from "@google/genai";
import { CLOUD_ENERGI_ASSETS } from '../data/mockGeoData';
import { MOCK_WORK_ORDERS } from '../data/mockWorkOrders';

// Fix: Removed permanent property and ensuring initialization inside methods to follow latest API key guidelines.
class GeminiService {
  private chatSession: Chat | null = null;

  /**
   * Generates a context string of the current operational state for the AI.
   */
  private getOperationalContext(): string {
    const criticalAssets = CLOUD_ENERGI_ASSETS.filter(a => a.status === 'CRITICAL');
    const warningAssets = CLOUD_ENERGI_ASSETS.filter(a => a.status === 'WARNING');
    const openWorkOrders = MOCK_WORK_ORDERS.filter(wo => wo.status === 'OPEN' || wo.status === 'IN_PROGRESS');
    const emergencyOrders = MOCK_WORK_ORDERS.filter(wo => wo.priority === 'EMERGENCY');
    
    return `
      CURRENT CLOUDTWIN OPERATIONAL STATE:
      - Critical Assets: ${criticalAssets.length} (${criticalAssets.map(a => a.name).join(', ')})
      - Warning Assets: ${warningAssets.length} (${warningAssets.map(a => a.name).join(', ')})
      - Active Work Orders: ${openWorkOrders.length}
      - Emergency Tasks: ${emergencyOrders.length}
      - Fleet Connectivity: 94%
      - Network Throughput: 2.8k SCM/hr
    `;
  }

  public async startChat(systemPromptAddition: string = ''): Promise<string> {
    const context = this.getOperationalContext();
    const systemInstruction = `You are the CloudTwin AI Operations Copilot for CloudEnergi. 
    You are an expert operations analyst. You have access to real-time telemetry, asset health, and work order status.
    
    ${context}
    
    Rules:
    1. Be professional, concise, and action-oriented.
    2. If an asset is CRITICAL, prioritize it.
    3. Suggest specific technicians (e.g., Ahmed S., Sarah L.) for repairs.
    4. Provide structured advice like "I recommend creating a work order for..."
    5. Do not hallucinate data; if you don't know, refer to the technical manual.
    ${systemPromptAddition}`;

    try {
      // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      this.chatSession = ai.chats.create({
        // Fix: Use gemini-3-pro-preview for complex operational reasoning.
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction,
        },
      });
      return "CloudTwin Copilot Online. System context synchronized. How can I assist with operations today?";
    } catch (error) {
      console.error("Failed to start AI session", error);
      return "Copilot starting in localized mode...";
    }
  }

  private getLocalSimulation(message: string): string | null {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('risk') || lowerMsg.includes('critical') || lowerMsg.includes('status')) {
      const critical = CLOUD_ENERGI_ASSETS.filter(a => a.status === 'CRITICAL');
      return `Current Risk Assessment:
      - **CRITICAL**: ${critical.map(a => a.name).join(', ')} is reporting telemetry failure or threshold breach.
      - **WARNING**: North PRMS Hub pressure is fluctuating.
      
      I recommend escalating Work Order WO-1048 immediately.`;
    }

    if (lowerMsg.includes('summary') || lowerMsg.includes('briefing')) {
      return `**Daily Operations Briefing - May 10, 2025**
      1. **Fleet**: Utilization is at 88%. One truck (T12) is critical.
      2. **Infrastructure**: Amman Compression Station throughput is nominal at 2.8k SCM/hr.
      3. **Maintenance**: 3 open work orders, 1 emergency calibration in Zarqa.
      
      No major network leaks detected. Overall system health: **74% (Caution)**.`;
    }

    if (lowerMsg.includes('recommend') || lowerMsg.includes('technician')) {
      return `For the current high-pressure issue at Zarqa, I recommend assigning **Ahmed S.** 
      He has the highest completion rate for pressure-related repairs and is currently 12km from the site.`;
    }

    if (lowerMsg.includes('work order') || lowerMsg.includes('create')) {
      return `I can prepare a work order template for any asset. 
      Which specific unit are we looking at? (e.g., Fleet T12 or North PRMS Hub)`;
    }

    return null;
  }

  public async sendMessage(message: string): Promise<string> {
    const simulated = this.getLocalSimulation(message);
    if (simulated) {
      await new Promise(r => setTimeout(r, 800));
      return simulated;
    }

    if (this.chatSession) {
      try {
        const response = await this.chatSession.sendMessage({ message });
        // Fix: Access .text property directly instead of .text() method.
        const text = response.text;
        return text || "No response generated.";
      } catch (error) {
        return "Operational data link intermittent. Localized logic suggests checking the Critical Assets list.";
      }
    }
    return "Copilot: Initializing analytical core. Baseline logic synchronized.";
  }
}

export const geminiService = new GeminiService();