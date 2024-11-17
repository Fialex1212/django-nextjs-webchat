"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { Card } from "../../ui/card";
import { useEffect } from "react";
import { userButtons } from "../utils";

const Settings = () => {
  // const { token } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   const checkToken = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     if (!token) {
  //       router.push("/auth/sign-in");
  //     }
  //   };
  //   checkToken();
  // }, [router, token]);

  return (
    <section>
      <div className="container">
        <ul>
          {userButtons.map((button, index) => (
            <li key={index}>
              <Link href={button.link}>
                <Card className="py-4 px-6 text-[20px] flex items-center gap-4">
                  <Settings />
                  {button.name}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Settings;
