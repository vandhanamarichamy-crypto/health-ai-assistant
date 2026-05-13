import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

function App() {

  const [sleep, setSleep] = useState("")
  const [water, setWater] = useState("")
  const [stress, setStress] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const analyzeHealth = async () => {

    setLoading(true)
    setResult("")

    try {

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      })

      const prompt = `
      User Health Data:
      - Sleep Hours: ${sleep}
      - Water Intake: ${water} litres
      - Stress Level: ${stress}/10

      Give:
      1. Risk level
      2. 3 short health suggestions
      3. Keep answer under 80 words.
      `

      const response = await model.generateContent(prompt)

      const text = response.response.text()

      setResult(text)

    } catch (error) {

      setResult("Something went wrong.")
      console.log(error)

    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-zinc-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-zinc-800">

        <h1 className="text-5xl font-bold text-center mb-3">
          Health AI Assistant
        </h1>

        <p className="text-center text-zinc-400 mb-10">
          Personalized wellness insights powered by AI
        </p>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 text-zinc-300">
              Sleep Hours
            </label>

            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              placeholder="Enter sleep hours"
            />
          </div>

          <div>
            <label className="block mb-2 text-zinc-300">
              Water Intake (Litres)
            </label>

            <input
              type="number"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              placeholder="Enter water intake"
            />
          </div>

          <div>
            <label className="block mb-2 text-zinc-300">
              Stress Level (1-10)
            </label>

            <input
              type="number"
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              placeholder="Enter stress level"
            />
          </div>

          <button
            onClick={analyzeHealth}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-4 rounded-xl font-semibold text-lg"
          >

            {loading ? "Analyzing..." : "Analyze Health"}

          </button>

        </div>

        {result && (

          <div className="mt-8 bg-zinc-800/80 border border-zinc-700 p-6 rounded-2xl">

            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              AI Health Analysis
            </h2>

            <p className="text-zinc-200 whitespace-pre-line leading-7">
              {result}
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default App