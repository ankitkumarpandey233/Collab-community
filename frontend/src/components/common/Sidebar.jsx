import React from 'react';
import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Logged out successfully");
            navigate("/login");
        },
        onError: () => {
            toast.error("Logout failed");
        },
    });
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    return (
        <div className="w-full md:w-[275px] fixed md:relative bottom-0 md:bottom-auto left-0 right-0 md:right-auto z-10 bg-black">
            <div className="flex md:flex-col border-t md:border-t-0 md:border-r border-gray-700 h-16 md:h-screen w-full md:w-[275px] md:max-w-[275px] md:min-w-[275px] md:sticky md:top-0">
                <Link to="/" className="hidden md:flex justify-start pl-4 pt-2">
                    <XSvg className="w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
                </Link>
                <ul className="flex md:flex-col justify-around md:justify-start items-center md:items-start w-full md:w-auto gap-3 md:mt-4 md:px-2">
                    <li className="flex justify-center md:justify-start w-full">
                        <Link
                            to="/"
                            className="flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 md:py-3 md:pl-4 md:pr-6 md:w-full cursor-pointer"
                        >
                            <MdHomeFilled className="w-6 h-6 md:w-7 md:h-7" />
                            <span className="text-xl hidden md:block">Home</span>
                        </Link>
                    </li>
                    <li className="flex justify-center md:justify-start w-full">
                        <Link
                            to="/notifications"
                            className="flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 md:py-3 md:pl-4 md:pr-6 md:w-full cursor-pointer"
                        >
                            <IoNotifications className="w-6 h-6 md:w-7 md:h-7" />
                            <span className="text-xl hidden md:block">Notifications</span>
                        </Link>
                    </li>
                    <li className="flex justify-center md:justify-start w-full">
                        <Link
                            to={`/profile/${authUser?.username}`}
                            className="flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 md:py-3 md:pl-4 md:pr-6 md:w-full cursor-pointer"
                        >
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden">
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl hidden md:block">Profile</span>
                        </Link>
                    </li>
                    <li className="flex justify-center md:justify-start w-full">
                        <Link
                            to="/users"
                            className="flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 md:py-3 md:pl-4 md:pr-6 md:w-full cursor-pointer"
                        >
                            <FaUsers className="w-6 h-6 md:w-7 md:h-7" />
                            <span className="text-xl hidden md:block">Users</span>
                        </Link>
                    </li>
                    <li className="flex md:hidden justify-center w-full">
                        <button
                            onClick={() => logout()}
                            className="flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 cursor-pointer"
                        >
                            <BiLogOut className="w-6 h-6" />
                        </button>
                    </li>
                </ul>
                {authUser && (
                    <div className="hidden md:flex mt-auto mb-4 gap-3 items-center transition-all duration-300 hover:bg-[#181818] py-3 px-4 mx-2 rounded-full">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
                            </div>
                        </div>
                        <div className="flex justify-between flex-1 items-center">
                            <div>
                                <p className="text-white font-bold text-sm truncate max-w-[120px]">{authUser?.fullName}</p>
                                <p className="text-slate-500 text-sm">@{authUser?.username}</p>
                            </div>
                            <BiLogOut
                                className="w-5 h-5 cursor-pointer ml-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;