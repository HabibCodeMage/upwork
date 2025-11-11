"use client";

import { useState } from "react";

interface ClientEntry {
  name: string;
  amount: string;
  rate: string;
}

export default function CalculatorPage() {
  const [clients, setClients] = useState<ClientEntry[]>([
    { name: "", amount: "", rate: "" },
  ]);
  const [results, setResults] = useState<
    { name: string; amount: number; rate: number; result: number; deduction: number; final: number }[]
  >([]);

  const handleAddClient = () => {
    setClients([...clients, { name: "", amount: "", rate: "" }]);
  };

  const handleChange = (index: number, field: keyof ClientEntry, value: string) => {
    const updated = [...clients];
    updated[index][field] = value;
    setClients(updated);
  };

  const handleCalculate = () => {
    const calculated = clients
      .filter((c) => c.name && c.amount && c.rate)
      .map((c) => {
        const amount = parseFloat(c.amount);
        const rate = parseFloat(c.rate);
        const result = amount * 0.05; // 5% of amount
        const deduction = result * 0.1; // 10% deduction
        const final = (result - deduction) * rate; // convert to PKR
        return { name: c.name, amount, rate, result, deduction, final };
      });
    setResults(calculated);
  };

  const totalSum = results.reduce((sum, r) => sum + r.final, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Client-wise Dollar Calculator</h1>

        {clients.map((client, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 mb-4 border-b pb-4 border-gray-200"
          >
            <input
              type="text"
              placeholder="Client Name"
              value={client.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="border rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Amount (USD)"
              value={client.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
              className="border rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Dollar Rate (PKR)"
              value={client.rate}
              onChange={(e) => handleChange(index, "rate", e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
        ))}

        <div className="flex justify-between">
          <button
            onClick={handleAddClient}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            + Add Client
          </button>
          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Client</th>
                  <th className="border p-2">Amount (USD)</th>
                  <th className="border p-2">Rate (PKR)</th>
                  <th className="border p-2">5% Result (USD)</th>
                  <th className="border p-2">Deduction (10%)</th>
                  <th className="border p-2">Final (PKR)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td className="border p-2 text-center font-medium">{r.name}</td>
                    <td className="border p-2 text-center">{r.amount.toFixed(2)}</td>
                    <td className="border p-2 text-center">{r.rate.toFixed(2)}</td>
                    <td className="border p-2 text-center">{r.result.toFixed(2)}</td>
                    <td className="border p-2 text-center">{r.deduction.toFixed(2)}</td>
                    <td className="border p-2 text-center font-semibold text-green-600">
                      {r.final.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4 text-lg font-semibold">
              Total (PKR): {totalSum.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
