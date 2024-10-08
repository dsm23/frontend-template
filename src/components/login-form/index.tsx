/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/card";

import { TextInputWithLabel } from "~/components/text-input-with-label";
import { Button } from "~/components/button";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TextInputWithLabel
            type="email"
            className="space-y-2"
            labelText="Email"
            placeholder="name@example.com"
            required
          />

          <TextInputWithLabel
            type="password"
            className="space-y-2"
            labelText="Password"
            required
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
