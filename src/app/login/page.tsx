"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (username === "admin" && password === "password") {
      setError(null);
      router.push('/');
    } else {
      setError("Nädogry ulanyjy ady ýa-da parol."); // Nädogry ulanyjy ady ýa-da parol. - Invalid username or password.
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Giriş</CardTitle>  {/* Giriş - Login */}
          <CardDescription>Hasaba girmek üçin ulanyjy adyňyzy we parolyňyzy giriziň</CardDescription>
           {/* Hasaba girmek üçin ulanyjy adyňyzy we parolyňyzy giriziň - Enter your username and password to log in */}
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Input
              type="text"
              placeholder="Ulanyjy ady"  /* Ulanyjy ady - Username */
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Input
              type="password"
              placeholder="Parol" /* Parol - Password */
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin}>Giriş</Button>  {/* Giriş - Login */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
