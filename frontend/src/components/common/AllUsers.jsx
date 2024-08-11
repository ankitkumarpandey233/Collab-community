import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useFollow from '../../hooks/useFollow';
import AllUsersSkeleton from '../skeletons/AllUsersSkeleton';
import LoadingSpinner from './LoadingSpinner';

const AllUsers = () => {
  // Fetch all users
  const { data: users, isLoading, isError, refetch: refetchUsers } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/users'); // Endpoint to fetch all users
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong!');
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  // Fetch authenticated user
  const { data: authUser, isLoading: isLoadingAuthUser, isError: isErrorAuthUser } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me'); // Updated endpoint to fetch authenticated user
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong!');
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow,  isPending } = useFollow();

  // Check if data is loading or if there's an error
  if (isError || isErrorAuthUser) return <div>Failed to load users. Please try again later.</div>;
  if (isLoading || isLoadingAuthUser) return (
    <>
      <AllUsersSkeleton />
      <AllUsersSkeleton />
      <AllUsersSkeleton />
      <AllUsersSkeleton />
    </>
  );
  if (users?.length === 0) return <div>No users available at the moment.</div>;

  return (
    <div className='my-4 mx-2'>
      <div className='bg-[#16181C] p-4 rounded-md'>
        <p className='font-bold'>All Users</p>
        <div className='flex flex-col gap-4'>
          {users.map((user) => {
            const isFollowing = authUser?.following.includes(user._id);

            return (
              <Link
                to={`/profile/${user.username}`}
                className='flex items-center justify-between gap-4'
                key={user._id}
              >
                <div className='flex gap-2 items-center'>
                  <div className='avatar'>
                    <div className='w-8 rounded-full'>
                      <img src={user.profileImg || '/avatar-placeholder.png'} alt={user.fullName} />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-semibold tracking-tight truncate w-28'>
                      {user.fullName}
                    </span>
                    <span className='text-sm text-slate-500'>@{user.username}</span>
                  </div>
                </div>
                <div>
                  <button
                    className={`btn ${isFollowing ? 'bg-red-500' : 'bg-white text-black'} hover:bg-opacity-90 rounded-full btn-sm`}
                    onClick={async (e) => {
                      e.preventDefault();
                        await follow(user._id);
                      refetchUsers(); // Optionally refetch users
                    }}
                  >
                    {isPending ? <LoadingSpinner size='sm' /> : isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
