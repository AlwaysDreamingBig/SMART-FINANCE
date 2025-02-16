import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface FooterProps {
  user: User;
  type?: 'desktop' | 'mobile';
}

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    console.log("Logging out.");
    // Redirect to login page or home after logging out
    router.push('/login');
  }

  // Define colors for the connection status
  const connectionStatusColor = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-500',
    'out-of-office': 'bg-red-500'
  };

  return (
    <footer className="footer flex justify-between items-center p-4 bg-white shadow-md space-x-4">
      {/* First Column: User Initial in Circle with Connection Status */}
      <div className="relative flex items-center justify-center space-x-2">
        {/* Initial Circle */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700">
          {user?.firstName[0]}
        </div>
        
        {/* Connection Status Button Inside the Circle */}
        <div
          className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ${connectionStatusColor[user.connectionStatus]} border-2 border-white`}
          title={user.connectionStatus} // Tooltip with the status
        ></div>
      </div>

      {/* Second Column: Name and Email */}
      <div className="flex flex-col items-start space-y-1">
        <h1 className="text-sm truncate text-gray-700 font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-sm truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      {/* Third Column: Logout Icon */}
      <div className="cursor-pointer" onClick={handleLogOut}>
        <Image src="assets/svg/logout-svgrepo-com.svg" width={24} height={24} alt="logout icon" />
      </div>
    </footer>
  );
}

export default Footer;
