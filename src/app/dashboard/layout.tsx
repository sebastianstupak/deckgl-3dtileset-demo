import React from "react";

const DashboardLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className={"h-full max-h-screen flex flex-col"}>
            <header className={"h-16 bg-amber-50  flex justify-center"}>
                <h1 className={"text-black font-bold text-4xl leading-relaxed"}>
                    SolarSight
                </h1>
            </header>
            <main className={"h-full w-full"}>
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;