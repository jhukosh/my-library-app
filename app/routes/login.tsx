import { ActionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/Button";
import { useUserConnexionModalContext } from "~/contexts/UserConnexionModalContext";
import { verifyLogin } from "~/server/user/user.server";
import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils/redirect.utils";

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // const remember = formData.get("remember");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (typeof email !== "string" || email.length <= 3 || !email.includes("@")) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: { email: null, password: "Password is too short" },
      },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

const Login = () => {
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { redirectUrl } =
    useUserConnexionModalContext();

  const [searchParams] = useSearchParams();
  const redirectTo = redirectUrl ?? searchParams.get("redirectTo") ?? undefined;

  return (
    <div className="flex min-h-full flex-col justify-center text-slate-600">
      <h2 className="self-center m-6 text-2xl font-semibold">
        Connect to your account
      </h2>
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button type="submit" text="Login" theme="dark" />

          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              No account yet ?{" "}
              <Link
                className="text-cyan-700 underline"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
