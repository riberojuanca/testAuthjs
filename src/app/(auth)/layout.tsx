function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <h1 className="bg-red-950 text-white">AuthLayout</h1>
      <div>{children}</div>
    </main>
  );
}

export default AuthLayout;
