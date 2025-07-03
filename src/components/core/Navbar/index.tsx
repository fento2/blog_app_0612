"use client";
import * as React from "react";
import Link from "next/link";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { apiCall } from "@/helper/apiCall";
import { setSignIn, setSignOut } from "@/lib/redux/features/userSlice";
import { PiSpinner } from "react-icons/pi";
import { HomeIcon } from "lucide-react";

const Navbar: React.FunctionComponent = () => {

  const userMail = useAppSelector((state) => state.userReducer.email);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const keepLogin = async () => {
    try {
      const tkn = localStorage.getItem("tkn");
      if (tkn) {
        const res = await apiCall.get(`/accounts/${tkn}`);
        dispatch(setSignIn(res.data));

      }

    } catch (error) {
      console.log(error);

    }

      setIsLoading(false);
  }

  React.useEffect(() => { //mode 1 setiap kali buka halaman 1 kali
    keepLogin();

  });


  return (
    <div className="flex items-center justify-between px-6 lg:px- py-5">
      <Link href="/" className="text-3xl font-bold">
        P
      </Link>
      <ul className="flex items-center gap-5">
        <li className="hidden lg:block">
          <div className="relative">
            <span className="absolute top-2.5 left-2">
              <FaSearch color="gray" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="border w-28 px-3 py-1 rounded-full pl-8"
            />
          </div>
        </li>

        <li className="flex items-center gap-2">

          {userMail ?

            <div className="flex items-center gap-4">

              <p>{userMail}</p>

              {pathname.includes("/my-article") ?
                <Link href="/">
                  <HomeIcon className="w-8 h-8 rounded-full hover:text-blue-500"/>
                </Link>
                :
                <Link href="/my-article">
                  <FaRegUserCircle className="w-8 h-8 rounded-full hover:text-blue-500"/>
                </Link>}

              <Button className="bg-red-500 hover:bg-red-800 cursor-pointer"
                type="button"
                onClick={() => {
                  dispatch(setSignOut());
                  localStorage.removeItem("tkn");
                  setIsLoading(false);

                }}>Sign Out</Button>

            </div>

            :

            !isLoading ? <>

              <Link
                href="/sign-up"
                className="bg-slate-200 text-slate-700 px-3 py-1 rounded-md shadow"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="bg-slate-700 text-white px-3 py-1 rounded-md shadow"
              >
                Sign In
              </Link>
            </>

              :

              <PiSpinner className="animate-spin text-4xl"/>
          }
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
