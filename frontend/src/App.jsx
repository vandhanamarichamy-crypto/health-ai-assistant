import { useState } from "react"
import axios from "axios"

function App() {

  const [sleep, setSleep] = useState("")
  const [water, setWater] = useState("")
  const [stress, setStress] = useState("")
  const [result, setResult] = useState("")

  const analyzeHealth = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        {
          sleep,
          water,
          stress
        }
      )

      setResult(response.data.result)

    } catch (error) {

      console.log(error)

      setResult("Something went wrong.")

    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Health AI Assistant
      </h1>

      <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-2xl">

        <div className="mb-4">
          <label className="block mb-2">
            Sleep Hours
          </label>

          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            placeholder="Enter sleep hours"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Water Intake (Litres)
          </label>

          <input
            type="number"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            placeholder="Enter water intake"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Stress Level (1-10)
          </label>

          <input
            type="number"
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            placeholder="Enter stress level"
          />
        </div>

        <button
          onClick={analyzeHealth}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-semibold"
        >
          Analyze Health
        </button>

        <div className="mt-6 bg-zinc-800 p-4 rounded-xl">

          <h2 className="text-2xl font-semibold mb-2">
            Health Analysis
          </h2>

          <p className="text-gray-300">
            {result}
          </p>

        </div>

      </div>

    </div>
  )
}

export default App