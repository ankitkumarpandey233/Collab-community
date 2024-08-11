import React from 'react';

const AllUsersSkeleton = () => {
  return (
    <div className='flex items-center gap-4 p-2 bg-[#20232A] rounded-md animate-pulse'>
      <div className='w-12 h-12 rounded-full bg-gray-700'></div>
      <div className='flex flex-col flex-1'>
        <div className='w-1/2 h-4 bg-gray-700 rounded mb-2'></div>
        <div className='w-1/4 h-4 bg-gray-700 rounded'></div>
      </div>
    </div>
  );
};

export default AllUsersSkeleton;
