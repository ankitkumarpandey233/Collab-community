import { useState } from 'react';
import AllUsers from '../../components/common/AllUsers';
import Followers from '../../components/common/Followers';
import Following from '../../components/common/Following';

const AllUserPage = () => {
  const [currentTab, setCurrentTab] = useState('allUsers');

  const renderContent = () => {
    switch (currentTab) {
      case 'allUsers':
        return <AllUsers />;
      case 'followers':
        return <Followers />;
      case 'following':
        return <Following />;
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
      {/* Header */}
      <div className='flex w-full border-b border-gray-700'>
        <div
          className={`flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative ${currentTab === 'allUsers' ? 'bg-primary' : ''}`}
          onClick={() => setCurrentTab('allUsers')}
        >
          All Users
          {currentTab === 'allUsers' && (
            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary'></div>
          )}
        </div>
        <div
          className={`flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative ${currentTab === 'followers' ? 'bg-primary' : ''}`}
          onClick={() => setCurrentTab('followers')}
        >
          Followers
          {currentTab === 'followers' && (
            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary'></div>
          )}
        </div>
        <div
          className={`flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative ${currentTab === 'following' ? 'bg-primary' : ''}`}
          onClick={() => setCurrentTab('following')}
        >
          Following
          {currentTab === 'following' && (
            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary'></div>
          )}
        </div>
      </div>

      {/* Display Content Based on Selected Tab */}
      <div className='p-4'>
        {renderContent()}
      </div>
    </div>
  );
};

export default AllUserPage;
