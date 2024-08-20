import { useState } from "react";

import { LabelledInput } from "../LabelledInput";
import { Button } from "../ui/button";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("getitnow");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [gymCode, setGymCode] = useState("STEEL/DEMO");

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/admin/signin`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          gymCode: gymCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Sign in failed");
      }
      const admin = await response.json();
      localStorage.setItem("token", admin.jwt);

      admin.jwt ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoibWFzdGVyIn0.UJ2j7urR89yBU63TcWW4Wy4FZ72KV30sCTLWXVyZy5k"
        ? navigate("/gym")
        : navigate(`/gym/${gymCode.split("/")[1]}/menu`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen flex-col flex justify-center bg-slate-800">
          <div className="w-full flex justify-center">
            <div>
              <div className="text-gray-200 text-4xl text-center mb-5">
                Log In
              </div>
              <LabelledInput
                label="Gym Code"
                placeholder="Code"
                labelColor="gray-200"
                textColor="white"
                formName="GymCode"
                formId="GymCode"
                autoComplete="Code"
                defaultValue="STEEL/DEMO"
                onChange={(e) => {
                  setGymCode(e.target.value.toUpperCase());
                }}
              />
              <LabelledInput
                label="Username"
                placeholder="Email"
                labelColor="gray-200"
                textColor="white"
                formName="email"
                formId="email"
                autoComplete="email"
                defaultValue="Demo"
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase());
                }}
              />
              <LabelledInput
                label="Password"
                placeholder="Password"
                labelColor="gray-200"
                textColor="white"
                formName="password"
                formId="password"
                type="password"
                defaultValue="getitnow"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="flex justify-center">
                <Button
                  variant={"outline"}
                  className="m-4"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                {error && (
                  <p className="text-red-500 font-light text-sm mt-2">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lime-300 hidden md:block">
          <div className="w-full flex justify-center">
            <div className="h-screen flex-col flex justify-center ">
              <div className="text-6xl font-semibold text-gray-600 max-w-md text-start">
                My work has been made easy!
              </div>
              <div className="text-xl flex justify-center text-black pt-4 max-w-md pl-10">
                -Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
